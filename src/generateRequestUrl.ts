import { LangKey } from './languages';
import sM from './sM';

export type TranslateOptions = {
  client: 'gtx' | 'webapp';
  from: LangKey;
  to: LangKey;
  hl: LangKey;
  raw: boolean;
  tld: string;
}

const defaultTranslateOptions: Omit<TranslateOptions, 'raw'> = {
  client: 'gtx',
  from: 'auto',
  to: 'en',
  hl: 'en',
  tld: 'com',
};

export function generateRequestUrl(text: string, options: Partial<Omit<TranslateOptions, 'raw'>>): string {
  const translateOptions = { ...defaultTranslateOptions, ...options };

  const queryParams = {
    client: translateOptions.client,
    sl: translateOptions.from,
    tl: translateOptions.to,
    hl: translateOptions.hl,
    ie: 'UTF-8',
    oe: 'UTF-8',
    otf: '1',
    ssel: '0',
    tsel: '0',
    kc: '7',
    q: text,
    tk: sM(text),
  };
  const searchParams = new URLSearchParams(queryParams);
  ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'].forEach(l => searchParams.append('dt', l));

  return `https://translate.google.${translateOptions.tld}/translate_a/single?${searchParams}`;
}
