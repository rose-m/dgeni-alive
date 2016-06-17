var _ = require('lodash');

/**
 * @dgProcessor filterTypescriptNgDocsProcessor
 * @description
 * Remove docs from typescript parser that contain the ngdoc tag
 */
module.exports = function filterTypescriptNgDocsProcessor(log) {
  return {
    $runAfter: ['tags-parsed'],
    $runBefore: ['extracting-tags'],
    $process: function (docs) {
      var docCount = docs.length;
      docs = _.filter(docs, function (doc) {
        return !(doc.ignoreInJsdoc && doc.tags.getTag('ngdoc'));
      });
      log.debug('filtered ' + (docCount - docs.length) + ' docs');
      return docs;
    }
  };
};
