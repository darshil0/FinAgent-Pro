import { FlatCompat } from '@eslint/eslintrc'
import nextPlugin from '@next/eslint-plugin-next'
 
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals'],
    plugins: ['import', '@typescript-eslint'],
  }),
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // ✅ FinAgent Pro - UX focused
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      
      // ✅ TypeScript - balanced (not too strict)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // ✅ React Hooks - performance focused
      'react-hooks/exhaustive-deps': ['warn', { additionalHooks: 'useEffectEvent' }],
      
      // ✅ Import strictness (critical for monorepo)
      'import/no-unresolved': ['error', { commonjs: true, amd: true }],
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],
      'import/no-useless-path-segments': 'error',
      
      // ✅ Next.js 16 + shadcn/ui
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-page-custom-font': 'off',
      
      // ✅ Performance + Accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
]
 
export default eslintConfig
