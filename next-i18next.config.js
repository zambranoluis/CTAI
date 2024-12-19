// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'de'],
  },
  detection: {
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie'],
  },
};