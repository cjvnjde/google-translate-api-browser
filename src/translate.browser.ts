import { generateRequestUrl } from "./generateRequestUrl";
import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { TranslateOptions } from "./TranslateOptions";
import { normaliseResponse } from "./normaliseResponse";

export async function translate(text: string, options: Partial<TranslateOptions & { corsUrl: string }> = {}) {
  const translateOptions = { ...defaultTranslateOptions, ...options };

  const encodedData = encodeURIComponent(`[[["${translateOptions.rpcids}","[[\\"${text}\\",\\"${translateOptions.from}\\",\\"${translateOptions.to}\\",true],[1]]",null,"generic"]]]`);
  const body = `f.req=${encodedData}&`;

  const url = generateRequestUrl(translateOptions);

  const response = await fetch(`${options.corsUrl || ''}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return normaliseResponse(await response.text())
}
