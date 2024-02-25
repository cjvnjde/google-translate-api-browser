import { createRequestBody } from "./createRequestBody";
import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { generateRequestUrl } from "./generateRequestUrl";
import { normaliseResponse } from "./normaliseResponse";
import { BrowserTranslateOptions } from "./types/BrowserTranslateOptions";
import { TranslationResult } from "./types/TranslationResult";

export async function translate(text: string, options: BrowserTranslateOptions = {}): Promise<TranslationResult> {
  const translateOptions: BrowserTranslateOptions = { raw: false, corsUrl: "", ...defaultTranslateOptions, ...options };

  const body = createRequestBody(text, translateOptions);
  const url = generateRequestUrl(translateOptions);

  const response = await fetch(`${options.corsUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...translateOptions.headers,
    },
    body
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return normaliseResponse(await response.text(), translateOptions.raw);
}
