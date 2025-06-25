module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      // Browser globals
      window: 'readonly',
      document: 'readonly',
      console: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      fetch: 'readonly',
      localStorage: 'readonly',
      sessionStorage: 'readonly',
      // Node globals
      process: 'readonly',
      Buffer: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
      module: 'readonly',
      require: 'readonly',
      exports: 'readonly',
      global: 'readonly'
    }
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'react-refresh',
    'unused-imports',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
};
