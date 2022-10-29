import { generateRequestUrl, TranslateOptions } from './generateRequestUrl';
import { normaliseResponse, TranslationResult } from './normaliseResponse';

let CORSUrl: string = '';

export const setCORS = (CORSURL: string) => {
  CORSUrl = CORSURL;
  return translate;
};

export async function translate(text: string, options: Partial<TranslateOptions> = {}): Promise<TranslationResult> {
  const translateUrl = generateRequestUrl(text, options);
  const response = await fetch(`${CORSUrl}${translateUrl}`);

  if (!response.ok) {
    throw new Error('Request failed');
  }

  const body = await response.json();
  return normaliseResponse(body, options.raw);
}
