import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { TranslateOptions } from "./TranslateOptions";

function validateTLD(tld: string) {
  return Boolean(tld.match(/^[a-zA-Z]{2,63}$/));
}

export function generateRequestUrl(options: Partial<Omit<TranslateOptions, 'raw'>> = {}): string {
  const translateOptions = { ...defaultTranslateOptions, ...options };

  if (!validateTLD(translateOptions.tld)) {
    throw new Error("Invalid TLD: Must be 2-63 letters only")
  }

  const queryParams = {
    rpcids: translateOptions.rpcids,
    'source-path': '/',
    hl: translateOptions.hl,
    'soc-app': '1',
    'soc-platform': '1',
    'soc-device': '1',
    rt: 'c'
  };
  const searchParams = new URLSearchParams(queryParams);

  return `https://translate.google.${translateOptions.tld}/_/TranslateWebserverUi/data/batchexecute?${searchParams}`;
}
