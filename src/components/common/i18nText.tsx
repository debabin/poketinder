'use client';

import React from 'react';
import { FormattedMessage } from 'react-intl';

interface I18nTextProps {
  path: LocaleMessageId;
  values?: Record<string, any>;
}

export const I18nText = React.memo(({ path, values }: I18nTextProps) => (
  <FormattedMessage id={path} values={values} />
));

I18nText.displayName = 'I18nText';
