import { TranslateOptions } from "./TranslateOptions";

export function createRequestBody(text: string, translateOptions: Pick<TranslateOptions, "to" | "from" | "rpcids">) {
  const encodedData = encodeURIComponent(
    `[[["${translateOptions.rpcids}","[[\\"${text}\\",\\"${translateOptions.from}\\",\\"${translateOptions.to}\\",true],[1]]",null,"generic"]]]`,
  );

  return `f.req=${encodedData}&`;
}
