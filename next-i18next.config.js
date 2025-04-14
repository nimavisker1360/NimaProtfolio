module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "tr"],
    localeDetection: true,
  },
  localePath: "./public/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
