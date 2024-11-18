import React from 'react';
import { IntlProvider } from 'react-intl';

import type { Messages } from './helpers/getMessagesByLocale';

export interface I18nProviderProps {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
}

export const I18nProvider = (props: I18nProviderProps) => <IntlProvider {...props} />;
