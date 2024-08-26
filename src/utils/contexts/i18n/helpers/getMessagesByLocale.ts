import defaultMessages from '@/static/locales/ru.json' assert { type: 'json' };

export type Messages = Record<LocaleMessageId, string>;

export const getMessagesByLocale = (locale: string) => {
  try {
    // eslint-disable-next-line ts/no-require-imports
    return require(`/src/static/locales/${locale}.json`) as Messages;
  } catch (error: unknown) {
    console.error('Error loading messages for locale', locale, error);

    return defaultMessages;
  }
};
