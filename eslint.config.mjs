// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/*.json',
    '**/*.config.js',
    // ...globs
  ],
})
