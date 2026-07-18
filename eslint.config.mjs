// Flat ESLint config (required by ESLint 9+ / eslint-config-next 16).
// eslint-config-next 16 ships its own native flat-config preset, so we
// import it directly rather than going through the legacy .eslintrc
// compatibility shim (which has a known circular-reference bug with the
// react-hooks plugin when used this way).
import nextConfig from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**'],
  },
]

export default eslintConfig
