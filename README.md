## Intro

A test runner for `storybook` and `styled-components` which allows for decoupled testing to ensure an interpolated style exists on the rendered component. This runner opinionates on an architecture which keeps declaration and implementation of styles seperate.

- [x] Support N nested children/pseudo
- [x] Catch duplicate or invalid `css` rules
- [ ] Support `@media` queries

## Project

- [`examples/`](examples)
  - [`styles/`](examples/Button/styles)
    - declaration of `css` styles
  - `*.stories.tsx` stories using [storybook](https://github.com/storybookjs/storybook)
  - `*.styles.tsx` implementation of `styled` and logic
  - `*.test.tsx` testing using [jest](https://github.com/facebook/jest)
  - `*.types.ts` types relevant to this component
- [`scripts/`](scripts)
  - `run.script.js` ensures invariant execution across all platforms and versions
  - `storybook.script.js` runs an invaraint instance of `start-storybook`
- [`.vscode/`](.vscode)
  - `launch.json` provides debugging with breakpoints in `src/components/*.test.tsx`
  - `settings.json` provides auto formatting using [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and hides irrelevant folders

## Workflow

The CI pipeline will run the following in chronological order

- `yarn test`,
  - to run every test from `examples/*/*.test.tsx`
- `yarn build`,
  - to bundle for `cjs` and `esm` together with `.d.ts` types

## Contributing

- Install depedencies using `yarn` to automatically make us of features such as [deduping](https://classic.yarnpkg.com/en/docs/cli/dedupe)
- Any new component _must_ be `exported` in `src/index.ts` to be included in the library
- The `workflow` will run on pull-requests and _must_ pass before any contribution will be reviewed
- Emphasize on generalization, encapsulation and invariance, see sample [component]()
