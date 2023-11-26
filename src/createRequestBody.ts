import { TranslateOptions } from "./TranslateOptions";
import { defaultTranslateOptions } from "./defaultTranslateOptions";

type CreateRequestBodyOptions = Partial<Pick<TranslateOptions, "to" | "from" | "rpcids">>

export function createRequestBody(text: string, {
  rpcids = defaultTranslateOptions.rpcids,
  from = defaultTranslateOptions.from,
  to = defaultTranslateOptions.to
}: CreateRequestBodyOptions) {
  const encodedData = encodeURIComponent(
    `[[["${rpcids}","[[\\"${text}\\",\\"${from}\\",\\"${to}\\",true],[1]]",null,"generic"]]]`
  );

  return `f.req=${encodedData}&`;
}
