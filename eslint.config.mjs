import { eslint } from '@siberiacancode/eslint';
import pluginDrizzle from 'eslint-plugin-drizzle';

export default eslint({
  typescript: true,
  jsx: true,
  jsxA11y: true,
  react: true,
  stylistic: true
}, {
  name: 'drizzle',
  plugins: {
    'drizzle': pluginDrizzle
  },
  rules: pluginDrizzle.configs.recommended.rules
}, {
  rules: {
    'node/prefer-global/process': ['error', 'always'],
    'siberiacancode-react/prop-types': 'off'
  }
});
