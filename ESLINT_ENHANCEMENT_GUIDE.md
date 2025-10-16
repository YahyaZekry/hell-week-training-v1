# ESLint Enhancement Guide

## Overview

This guide provides detailed instructions for enhancing the ESLint configuration to enforce code quality and consistency across the Hell Week Training app.

## Current State Analysis

The current ESLint configuration is minimal and uses only the base Expo configuration:

```javascript
// Current eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);
```

## Enhanced ESLint Configuration

### Step 1: Install Additional ESLint Plugins

```bash
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-react \
  eslint-plugin-react-native \
  eslint-plugin-react-hooks \
  eslint-plugin-import \
  eslint-plugin-jsx-a11y \
  eslint-plugin-react-native-a11y
```

### Step 2: Update ESLint Configuration

Replace the current `eslint.config.js` with an enhanced configuration:

```javascript
// eslint.config.js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const typescriptConfig = require('@typescript-eslint/eslint-plugin');
const reactConfig = require('eslint-plugin-react');
const reactNativeConfig = require('eslint-plugin-react-native');
const importConfig = require('eslint-plugin-import');
const a11yConfig = require('eslint-plugin-jsx-a11y');
const reactNativeA11yConfig = require('eslint-plugin-react-native-a11y');

module.exports = defineConfig([
  ...expoConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptConfig,
      'react': reactConfig,
      'react-native': reactNativeConfig,
      'react-hooks': require('eslint-plugin-react-hooks'),
      'import': importConfig,
      'jsx-a11y': a11yConfig,
      'react-native-a11y': reactNativeA11yConfig,
    },
    rules: {
      // TypeScript Rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      
      // React Rules
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'react/jsx-uses-react': 'off', // Not needed with React 17+
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-typos': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'warn',
      'react/self-closing-comp': 'error',
      
      // React Hooks Rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // React Native Rules
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-duplicate-styles': 'error',
      'react-native/no-children-prop': 'error',
      
      // Import/Export Rules
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],
      'import/no-unresolved': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      
      // Accessibility Rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/media-has-caption': 'warn',
      'jsx-a11y/mouse-events-have-key-events': 'warn',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
      
      // React Native Accessibility Rules
      'react-native-a11y/has-accessibility-props': 'warn',
      'react-native-a11y/has-valid-accessibility-actions': 'error',
      'react-native-a11y/has-valid-accessibility-component-type': 'error',
      'react-native-a11y/has-valid-accessibility-ignores-invert-colors': 'error',
      'react-native-a11y/has-valid-accessibility-label': 'warn',
      'react-native-a11y/has-valid-accessibility-live-region': 'error',
      'react-native-a11y/has-valid-accessibility-role': 'error',
      'react-native-a11y/has-valid-accessibility-state': 'error',
      'react-native-a11y/has-valid-accessibility-states': 'error',
      'react-native-a11y/has-valid-accessibility-traits': 'error',
      'react-native-a11y/has-valid-accessibility-value': 'error',
      'react-native-a11y/no-nested-touchables': 'warn',
      'react-native-a11y/no-accessibility-prop': 'error',
      
      // General Code Quality Rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      'no-with': 'error',
      'prefer-promise-reject-errors': 'error',
      'require-await': 'error',
      'yoda': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-native/no-inline-styles': 'off',
    },
  },
  {
    ignores: [
      'dist/*',
      'build/*',
      'node_modules/*',
      '.expo/*',
      'coverage/*',
      '*.config.js',
      '*.config.ts',
    ],
  },
]);
```

### Step 3: Add Prettier Configuration

Create a `.prettierrc` file for consistent code formatting:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### Step 4: Update Package.json Scripts

Add new scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "lint:fix": "expo lint --fix",
    "lint:strict": "expo lint --max-warnings 0",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```

## Pre-commit Hooks Setup

### Step 1: Install Husky and lint-staged

```bash
npm install --save-dev husky lint-staged
```

### Step 2: Initialize Husky

```bash
npx husky install
npm pkg set scripts.prepare="husky install"
```

### Step 3: Add Pre-commit Hook

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### Step 4: Configure lint-staged

Add to your `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

## VS Code Integration

### Step 1: Install VS Code Extensions

Recommended extensions:
- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

### Step 2: Add VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "typescriptreact"
  }
}
```

## Custom Rules for This Project

### React Native Specific Rules

1. **No Color Literals**: Use color constants instead of hardcoded colors
2. **No Inline Styles**: Use StyleSheet for performance
3. **Split Platform Components**: Use platform-specific files when needed

### TypeScript Specific Rules

1. **No Explicit Any**: Warn against using `any` type
2. **Prefer Nullish Coalescing**: Use `??` instead of `||`
3. **Prefer Optional Chaining**: Use `?.` for safe property access

### Accessibility Rules

1. **Accessibility Props Required**: Warn when accessibility props are missing
2. **No Nested Touchables**: Prevent nested touchable components
3. **Valid Accessibility Roles**: Ensure proper accessibility roles

## Migration Strategy

### Phase 1: Setup
1. Install all dependencies
2. Update ESLint configuration
3. Add Prettier configuration
4. Set up pre-commit hooks

### Phase 2: Fix Existing Issues
1. Run `npm run lint` to identify issues
2. Fix high-priority issues first
3. Gradually address warnings
4. Update code to follow new standards

### Phase 3: Enforcement
1. Enable strict linting in CI/CD
2. Require all PRs to pass linting
3. Monitor code quality metrics
4. Continuously improve rules

## Troubleshooting

### Common Issues

1. **Import Resolution Errors**
   - Check TypeScript configuration
   - Verify module resolution settings
   - Ensure correct file extensions

2. **React Native Rules Not Working**
   - Verify plugin installation
   - Check file patterns in configuration
   - Ensure React Native is recognized

3. **Performance Issues**
   - Use cache flags for faster linting
   - Exclude unnecessary files
   - Consider using ESLint cache

4. **Pre-commit Hooks Not Running**
   - Verify Husky installation
   - Check git hooks directory
   - Ensure proper file permissions

## Best Practices

1. **Start with Base Rules**: Begin with essential rules and gradually add more
2. **Team Consensus**: Get team buy-in for coding standards
3. **Documentation**: Document rule decisions and exceptions
4. **Regular Updates**: Keep ESLint and plugins up to date
5. **Gradual Adoption**: Allow time for developers to adapt

## Next Steps

After implementing the enhanced ESLint configuration:

1. Run full lint on the codebase
2. Fix all identified issues
3. Update team documentation
4. Monitor code quality improvements
5. Adjust rules based on team feedback