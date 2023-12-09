import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { CreateRequestBodyOptions } from "./types/CreateRequestBodyOptions";

function escapeQuote(string: string): string {
  return string.replace(/["]/g, "\\\\\\$&");  // $& means the whole matched string
}

export function createRequestBody(
  text: string,
  { rpcids = defaultTranslateOptions.rpcids, from = defaultTranslateOptions.from, to = defaultTranslateOptions.to }: CreateRequestBodyOptions = {},
): string {
  const encodedData = encodeURIComponent(`[[["${rpcids}","[[\\"${escapeQuote(text)}\\",\\"${from}\\",\\"${to}\\",1],[]]",null,"generic"]]]`);

  return `f.req=${encodedData}&`;
}
