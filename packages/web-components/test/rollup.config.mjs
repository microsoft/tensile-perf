import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';


const plugins = [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.bench.json' }),
];

export default [
    {
        output: [
            {
                dir: './.stress-test',
                format: "esm",
                // plugins: [terser()],
                sourcemap: true,
            },
        ],
        plugins,
    },
];