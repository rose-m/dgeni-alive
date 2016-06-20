var _ = require('lodash');

/**
 * @dgProcessor generateTypescriptComponentGroupsProcessor
 * @description
 * Generate documents for each group of components (by type) within a TypeScript module
 */
module.exports = function generateTypescriptComponentGroupsProcessor(modules, combineTsDocTypes) {
  return {
    $runAfter: ['moduleDocsProcessor'],
    $runBefore: ['computing-paths'],
    $process: function (docs) {
      _(modules).forEach(function (moduleDoc) {
        if (moduleDoc.exports.length === _(moduleDoc.exports).filter('moduleTree').length) {
          return;
        }

        var typeToGroup = _(moduleDoc.exports)
          .groupBy('docType')
          .tap(function (docTypes) {
            // We don't want the overview docType or sub-modules to be represented as a componentGroup
            delete docTypes.overview;
            delete docTypes.module;
          })
          .tap(combineTsDocTypes)
          .map(function (docs, docType) {
            return {
              id: moduleDoc.id + '.' + docType,
              docType: 'componentGroup',
              groupType: docType,
              moduleName: moduleDoc.name,
              moduleDoc: moduleDoc,
              area: moduleDoc.area,
              name: getDisplayDocType(docType) + ' in ' + moduleDoc.name,
              components: docs,
              navName: getDisplayDocType(docType),
              ts: true
            };
          })
          .value();

        moduleDoc.componentGroups = typeToGroup;
        _.forEach(typeToGroup, function (group) {
          docs.push(group);
        });
      });
    }
  };

  function getDisplayDocType(docType) {
    if (docType === 'constVarFunctions') {
      return 'Constants, Variables, and Functions';
    } else {
      return docType;
    }
  }
};
