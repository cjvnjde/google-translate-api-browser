import { generateRequestUrl } from "./generateRequestUrl";
import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { TranslateOptions } from "./TranslateOptions";
import { normaliseResponse } from "./normaliseResponse";
import { createRequestBody } from "./createRequestBody";

type BrowserTranslateOptions = Partial<TranslateOptions & { corsUrl: string, raw: boolean }>;

export async function translate(text: string, options: BrowserTranslateOptions = {}) {
  const translateOptions: BrowserTranslateOptions = { raw: false, corsUrl: "", ...defaultTranslateOptions, ...options };

  const body = createRequestBody(text, translateOptions);
  const url = generateRequestUrl(translateOptions);

  const response = await fetch(`${options.corsUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return normaliseResponse(await response.text(), translateOptions.raw);
}
