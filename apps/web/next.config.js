const withTM = require("next-transpile-modules")([
  // Add "math-helpers" to this array:
  "graphite",
]);
 

module.exports = withTM({
  reactStrictMode: true,
})
