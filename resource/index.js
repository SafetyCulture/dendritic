const scaffold = require('../lib/scaffold');
const pkg = require('../lib/package');

const userDependencies = {
  'simple-password': '^1.0.1'
};

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    { p: 'config', n: 'warnings' },
    { p: 'src/utils', n: 'model' },
    { p: 'test/utils', n: 'model_test' },
    { p: 'src/models', n: 'index' },
    { n: 'src/models/model', d: 'src/models', t: opts.snakeCase },
    { n: 'src/controllers/controller', d: 'src/controllers', t: opts.snakeCasePlural },
    { n: 'src/routes/route', d: 'src/routes', t: opts.snakeCasePlural },
    { n: 'test/controllers/controller_test', d: 'test/controllers', t: `${opts.snakeCasePlural}_test` },
    { n: 'test/routes/route_test', d: 'test/routes', t: `${opts.snakeCasePlural}_test` },
    { n: 'fixture', d: 'fixtures', t: opts.snakeCase },
    { n: 'schema', d: 'schemas', t: opts.snakeCase, e: 'json' }
  ];

  if (opts.isUser) {
    // if user is scaffolded, add user specific dependencies
    const packagePath = `${opts.path}/package.json`;
    pkg.addDependencies(packagePath, userDependencies);

    // if user is scaffolded, jwt lib required
    files.push({ p: 'src/utils', n: 'jwt' });
  }

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });
};
