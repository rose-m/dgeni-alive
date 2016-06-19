var Package = require('dgeni').Package;

/**
 * @dgPackage typescript-ext
 * @description
 * Extensions for the dgeni-packages/typescript
 */
module.exports = new Package('typescript-ext', [require('dgeni-packages/typescript')])

// Add in the real processors for this package
  .processor(require('./processors/addAreaToTypescriptDocs'));
