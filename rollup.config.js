import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

// @ts-ignore
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

import dotenv from 'dotenv';

// .env
dotenv.config();
const debug = process.env.DEBUG || true;

// configs
const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: debug,
        name: 'react-lib',
        esModule: false,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: debug,
        esModule: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
  {
    input: `lib/esm/types/src/index.d.ts`,
    output: [
      { file: `lib/cjs/index.d.ts`, format: 'cjs' },
      { file: `lib/esm/index.d.ts`, format: 'esm' },
    ],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
