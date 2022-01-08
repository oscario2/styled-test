const { run } = require('./run.script');

/**
 * `storybook` will experience issues loading or updating
 * if using multiple tabs (__webpack_hmr)
 */
async function main() {
  const args = ['start-storybook', '-p', '6006'];
  await run('npx', args);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
