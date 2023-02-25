const withTM = require('next-transpile-modules')(['graphite-react', 'graphite-core']);

module.exports = withTM({
  reactStrictMode: true,
});
