/**
 * @dgProcessor addAreaToTypescriptDocs
 * @description
 * Adds the 'api' area attribute to all docs with ignoreInJsdoc (set in typescript)
 */
module.exports = function addAreaToTypescriptDocs() {
  return {
    $runAfter: ['typescript-read'],
    $runBefore: ['parsing-tags'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.ignoreInJsdoc && !doc.area) {
          doc.area = 'api';
        }
      });
    }
  }
};
