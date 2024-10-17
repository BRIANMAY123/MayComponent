import basicConfig from './rollup.config'
//主要功能是从最终的打包文件中排除某些依赖项
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"

const config = {
  ...basicConfig,
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    ...basicConfig.plugins,
    excludeDependenciesFromBundle(),
  ]
}

export default config