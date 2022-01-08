const { spawn } = require('child_process');

// constants
const NODE_MAJOR_VERSION = parseInt(process.version.substring(1, 3));
const PLATFORM = process.platform;

/**
 * execute command and return deferred promise
 * @param {"npx" | "yarn"} bin
 * @param {string[]} args
 */
async function run(bin, args) {
  /** @type {(value: boolean) => void} */
  let _resolve = (_value) => {};
  const promise = new Promise((resolve, _reject) => {
    _resolve = resolve;
  });

  /** @type {{ NODE_OPTIONS?: string }} */
  const env = {};
  if (NODE_MAJOR_VERSION >= 17 && PLATFORM !== 'win32') {
    env.NODE_OPTIONS = '--openssl-legacy-provider';
  }

  // or `yarn`
  const run = spawn(bin, args, {
    env: { ...process.env, ...env },
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
  });

  // TODO: capture error and genrate issue template

  // resolve `promise` on exit or sigint
  run.on('exit', () => {
    _resolve(true);
  });

  return promise;
}

module.exports = { run };
