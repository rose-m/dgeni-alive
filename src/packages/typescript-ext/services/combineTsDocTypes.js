/**
 * @dgService combineTsDocTypes
 * @description
 * Takes docs groupedBy docType and combines const/var/let/functions into one constVarFunctions
 */
module.exports = function combineTsDocTypes() {
  return function combineDocTypes(docTypesMap) {
    var constVarFunctions = [];
    ['const', 'var', 'let', 'function'].forEach(function (type) {
      if (docTypesMap[type]) {
        constVarFunctions = constVarFunctions.concat(docTypesMap[type]);
        delete docTypesMap[type];
      }
    });
    if (constVarFunctions.length) {
      docTypesMap.constVarFunctions = constVarFunctions;
    }
  }
};
