var mockPackage = require('../mocks/mockPackage');
var Dgeni = require('dgeni');

function createMockTagCollection(tags) {
  return {
    getTag: function(value) {
      return tags[value];
    }
  };
}


describe("filter-typescript-ngdocs doc-processor plugin", function() {
  var processor;

  beforeEach(function() {
    var dgeni = new Dgeni([mockPackage()]);
    var injector = dgeni.configureInjector();
    processor = injector.get('filterTypescriptNgDocsProcessor');
  });

  it("should only return docs from javascript or typescript without ngdoc", function() {

    var doc1 = { tags: createMockTagCollection({ngdoc: 'a'}) };

    var doc2 = { tags: createMockTagCollection({other: 'b'}), ignoreInJsdoc: true };

    var doc3 = { tags: createMockTagCollection({other: 'd'}) };

    var doc4 = { tags: createMockTagCollection({ngdoc: 'd'}), ignoreInJsdoc: true };

    var docs = [ doc1, doc2, doc3, doc4 ];

    var filteredDocs = processor.$process(docs);

    expect(filteredDocs).toEqual([doc1, doc2, doc3]);
  });
});
