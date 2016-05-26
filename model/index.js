const scaffold = require('../lib/scaffold');
const pkg = require('../lib/package');

const userDependencies = {
  'simple-password': '^1.0.1'
};

module.exports = (opts) => {
  // p: source path, n: filename
  // d: destination path, t: target filename, e: target extension
  const files = [
    { p: 'constants', n: 'warnings' },
    { p: 'constants', n: 'errors' },
    { p: 'lib', n: 'model' },
    { p: 'lib', n: 'rethinkdb' },
    { p: 'lib', n: 'schema' },
    { p: 'test/lib', n: 'model' },
    { p: 'test/lib', n: 'rethinkdb' },
    { n: 'model', d: 'models', t: opts.name },
    { n: 'controller', d: 'controllers', t: opts.name },
    { n: 'test', d: 'test/models', t: `${opts.name}_test` },
    { n: 'route', d: 'routes', t: opts.name },
    { n: 'table', d: 'tables', t: opts.name },
    { n: 'fixture', d: 'fixtures', t: opts.name },
    { n: 'schema', d: 'schemas', t: opts.name, e: 'json' }
  ];

  if (opts.isUser) {
    // if user is scaffolded, add user specific dependencies
    const packagePath = `${opts.path}/package.json`;
    pkg.addDependencies(packagePath, userDependencies);

    // if user is scaffolded, jwt lib required
    files.push({ p: 'lib', n: 'jwt' });
  }

  scaffold({ basePath: __dirname, files, mustacheOpts: opts });
};
