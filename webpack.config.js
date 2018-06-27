const fs = require('fs');
const path = require('path');

const { react } = require('webpack-features');
const rootPath = fs.realpathSync(process.cwd());

module.exports = react(
  {
    entry: './src/index.tsx',
    types: 'typescript',
    babelrc: false,
    babelPolyfill: 'usage',
    template: './src/index.html',
  },
  {
    javascript: {
      eslint: false,
      tsOptions: {
        configFile: path.resolve(rootPath, './tsconfig.json'),
      },
    },
  }
);
