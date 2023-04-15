const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  mode: 'none',
  target: 'node',
  optimization: {
    usedExports: true,
  },
};
