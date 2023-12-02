import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { CreateRequestBodyOptions } from "./types/CreateRequestBodyOptions";

export function createRequestBody(
  text: string,
  { rpcids = defaultTranslateOptions.rpcids, from = defaultTranslateOptions.from, to = defaultTranslateOptions.to }: CreateRequestBodyOptions = {},
): string {
  const encodedData = encodeURIComponent(`[[["${rpcids}","[[\\"${text}\\",\\"${from}\\",\\"${to}\\",1],[]]",null,"generic"]]]`);

  return `f.req=${encodedData}&`;
}
