import { eslint } from '@siberiacancode/eslint';
import pluginDrizzle from 'eslint-plugin-drizzle';

export default eslint(
  {
    typescript: true
  },
  {
    name: 'drizzle',
    plugins: {
      drizzle: pluginDrizzle
    },
    rules: pluginDrizzle.configs.recommended.rules
  },
  {
    rules: {
      'node/prefer-global/process': ['error', 'always'],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: {
            callback: 'on*',
            reserved: ['key', 'ref']
          },
          groups: ['shorthand', 'reserved', 'multiline', 'unknown', 'callback'],
          order: 'asc',
          type: 'alphabetical'
        }
      ],
      'siberiacancode-react/prop-types': 'off'
    }
  }
);
