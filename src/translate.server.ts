import * as https from "node:https";
import { createRequestBody } from "./createRequestBody";
import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { generateRequestUrl } from "./generateRequestUrl";
import { normaliseResponse } from "./normaliseResponse";
import { ServerTranslateOptions } from "./types/ServerTranslateOptions";
import { TranslationResult } from "./types/TranslationResult";

export function translate(text: string, options: ServerTranslateOptions = {}): Promise<TranslationResult> {
  const translateOptions: ServerTranslateOptions = { raw: false, ...defaultTranslateOptions, ...options };

  return new Promise((resolve, reject) => {
    const body = createRequestBody(text, translateOptions);
    const url = generateRequestUrl(translateOptions);

    const req = https
      .request(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(body),
            ...translateOptions.headers,
          },
        },
        (resp) => {
          let data = "";

          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            resolve(normaliseResponse(data, translateOptions.raw));
          });
        },
      )
      .on("error", reject);

    req.write(body);
    req.end();
  });
}
