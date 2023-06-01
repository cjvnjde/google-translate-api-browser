import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/esm.js",
        format: "es",
        sourcemap: true,
        plugins: [terser()],
      }
    ],
    plugins: [
      resolve({ browser: true }),
      commonjs({
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfig: "./tsconfig.esm.json",
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs.js",
        format: "commonjs",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve({ browser: true }),
      commonjs({
        transformMixedEsModules: true,
      }),
      typescript(),
    ],
  },
];