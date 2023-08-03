const path = require('path');

const tensilePath = '.tensile';

// A Webpack config that produces an ES module library
module.exports = (env, argv) => {
  const { mode, entry: entries } = argv;
  if (!Array.isArray(entries) || entries.length !== 1) {
    throw new Error('Expected a single entry point');
  }

  const entry = entries[0];
  const outputFilename = path.join(tensilePath, entry.replace(path.extname(entry), '.js'));

  const config = {
    mode,
    output: {
      filename: outputFilename,
      path: path.resolve(__dirname),
      library: {
        type: 'module'
      }
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                target: 'es2019',
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
                transform: {
                  decoratorMetadata: true,
                  legacyDecorator: true,
                },
                keepClassNames: true,
                externalHelpers: true,
                loose: true,
              },
            },
          },
        },
      ],
    },
    optimization: {
      minimize: false,
      
    },
    externalsType: 'global',
    externals: {
      react: 'React',
    },
    experiments: {
      outputModule: true,
    }
  };

  return config;
};