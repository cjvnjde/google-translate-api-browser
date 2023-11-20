import { TranslateOptions } from "./TranslateOptions";

export const defaultTranslateOptions: Omit<TranslateOptions, 'raw'> = {
  from: 'auto',
  to: 'en',
  hl: 'en',
  tld: 'com',
  rpcids: 'MkEWBc',
};
