import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { CreateRequestBodyOptions } from "./types/CreateRequestBodyOptions";

function escapeSpecialSymbols(inputString: string): string {
    const escapedString = inputString.replace(/["]/g, '\\\\\\$&');
    const normalizedString = escapedString.replace(/\r\n|\r|\n/g, '\\\\n');

    return normalizedString;
}

export function createRequestBody(
  text: string,
  { rpcids = defaultTranslateOptions.rpcids, from = defaultTranslateOptions.from, to = defaultTranslateOptions.to }: CreateRequestBodyOptions = {},
): string {
  const normalizedText = escapeSpecialSymbols(text.trim());
  const encodedData = encodeURIComponent(`[[["${rpcids}","[[\\"${normalizedText}\\",\\"${from}\\",\\"${to}\\",1],[]]",null,"generic"]]]`);

  return `f.req=${encodedData}&`;
}
