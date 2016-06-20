'use strict';

var _ = require('lodash');

module.exports = function navigationMapper_TS(aliasMap, log, navigationMapperTitles, combineTsDocTypes) {

  var debug = log.debug;

  function apiMapper(pages) {
    var res = [];

    _(pages)
      .filter('moduleTree')  // this is only set for modules
      .sortBy('id')  // alphabetic sort by fully qualified name
      // .groupBy('module') // group by name
      .forEach(function (moduleDoc) {
        debug('Processing module: %s', moduleDoc.name);

        if (moduleDoc.exports.length == 0) {
          debug('Empty module: %s', moduleDoc.name);
          return;
        } else if (moduleDoc.exports.length == _.filter(moduleDoc.exports, 'moduleTree').length) {
          debug('Module %s has only module exports - ignoring', moduleDoc.name);
          return;
        }

        var navGroup = {
          name: moduleDoc.id.replace(/\//g, '.'),
          type: 'groups',
          href: moduleDoc.path,
          navItems: []
        };
        res.push(navGroup);

        // Analyse the modules exports
        _(moduleDoc.exports)
          .filter(function (doc) {
            return doc.docType !== 'module';
          })
          .sortBy('docType')
          .groupBy('docType')
          .tap(combineTsDocTypes)
          .forEach(function (docs, docType) {
            var navItems = [];
            var componentGroup = _.find(pages, {moduleName: moduleDoc.name, groupType: docType, docType: 'componentGroup'});

            if (!componentGroup) {
              log.error('Cannot find componentGroup for: %s.%s', moduleDoc.name, docType);
              return;
            }

            navGroup.navItems.push({
              name: componentGroup.navName || docType,
              type: 'section',
              href: componentGroup.path,
              navItems: navItems
            });

            _(docs)
              .sortBy('name')
              .forEach(function (doc) {
                navItems.push({
                  name: doc.name,
                  type: doc.docType,
                  href: doc.path
                });
              });
          });
      });
    return res;
  }

  Object.defineProperty(apiMapper, 'area', {
    value: 'ts'
  });

  Object.defineProperty(apiMapper, 'title', {
    value: navigationMapperTitles.ts
  });

  return apiMapper;
};
