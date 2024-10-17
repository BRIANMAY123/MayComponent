import basicConfig from './rollup.config'
//用于压缩 JavaScript 代码，以减小文件大小并提高加载速度。
import { terser } from "rollup-plugin-terser"
//在构建过程中替换代码中的特定字符串，这里用于将 process.env.NODE_ENV 替换为 'production'，以便在生产环境中优化代码。
import replace from '@rollup/plugin-replace'

const config = {
  ...basicConfig,
  output: [
    {
      name: 'May',
      file: 'dist/index.umd.js',
      format: 'umd',
      exports: 'named',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'Axios'
      },
      plugins: [
        terser()
      ],
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    ...basicConfig.plugins
  ],
  //指定了外部依赖项，这些依赖项不会被打包到输出文件中，而是期望在运行时提供。
  external: ['react', 'react-dom', 'axios']
}

export default config