const baseConfig = require('gd-configs/eslint/web')

const getRules = (baseRules) => {
  const rules = {}
  Object.keys(baseRules).forEach((key) => {
    if (!key.startsWith('typescript')) {
      rules[key] = baseRules[key]
    }
  })
  return rules
}

const config = {
  ...baseConfig,
  parser: 'babel-eslint',
  plugins: baseConfig.plugins.filter((x) => !x.startsWith('typescript')),
  rules: getRules(baseConfig.rules),
}

module.exports = config
