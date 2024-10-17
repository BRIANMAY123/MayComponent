import typescript from 'rollup-plugin-typescript2'
//能够解析 Node.js 模块。允许在项目中使用 import 语句引入来自 node_modules 的依赖。
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import sass from 'rollup-plugin-sass'

//配置 TypeScript 编译器，以便在编译时生成类型声明，并排除特定的测试和故事文件。
const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["src/**/*.test.tsx", "src/**/*.stories.tsx", "src/**/*.stories.mdx", "src/setupTests.ts"]
}

const config = {
  input: 'src/index.tsx',
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfigOverride: overrides }),
    sass({ output: 'dist/index.css' })
  ],
}

export default config