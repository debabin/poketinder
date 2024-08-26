'use client';

import type { I18nProviderProps } from '@/contexts/i18n';
import { I18nProvider } from '@/contexts/i18n';

interface ProvidersProps {
  children: React.ReactNode
  i18n: Omit<I18nProviderProps, 'children'>;
}

export const Providers = ({ children, i18n }: ProvidersProps) => (
  <I18nProvider {...i18n}>{children}</I18nProvider>
);
