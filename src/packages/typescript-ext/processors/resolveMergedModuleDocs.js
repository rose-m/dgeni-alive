var _ = require('lodash');

/**
 * @dgProcessor resolveMergedModuleDocs
 * @description
 * Cleanup merged modules to compute correct paths and ids
 */
module.exports = function resolveMergedModuleDocs() {
  return {
    $runBefore: ['generateTypescriptComponentGroupsProcessor'],
    $process: function (docs) {
      _(docs)
        .filter(function (doc) {
          return doc.ignoreInJsdoc && doc.moduleDoc && doc.moduleDoc.mergedInto;
        })
        .forEach(function (doc) {
          while (doc.moduleDoc.mergedInto) {
            doc.moduleDoc = doc.moduleDoc.mergedInto;
          }
        });
    }
  };
};
