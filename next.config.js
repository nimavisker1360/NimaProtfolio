/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    ...i18n,
    localeDetection: true,
  },
};

module.exports = nextConfig;
