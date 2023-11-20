import { generateRequestUrl } from "./generateRequestUrl";
import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { TranslateOptions } from "./TranslateOptions";
import { normaliseResponse, TranslationResult } from "./normaliseResponse";
import * as https from 'node:https';

export function translate(text: string, options: Partial<TranslateOptions> = {}): Promise<TranslationResult> {
  const translateOptions = { ...defaultTranslateOptions, ...options };

  return new Promise((resolve, reject) => {
    const encodedData = encodeURIComponent(`[[["${translateOptions.rpcids}","[[\\"${text}\\",\\"${translateOptions.from}\\",\\"${translateOptions.to}\\",true],[1]]",null,"generic"]]]`);
    const body = `f.req=${encodedData}&`;

    const url = generateRequestUrl(translateOptions);

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        resolve(normaliseResponse(data))
      });
    }).on('error', (err) => {
      reject(err)
    })

    req.write(body);
    req.end();
  })
}
