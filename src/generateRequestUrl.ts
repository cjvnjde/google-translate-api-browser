import { defaultTranslateOptions } from "./defaultTranslateOptions";
import { GenerateRequestUrlOptions } from "./types/GenerateRequestUrlOptions";

function validateTLD(tld: string): boolean {
  return Boolean(tld.match(/^[a-zA-Z]{2,63}$/));
}

export function generateRequestUrl({
  rpcids = defaultTranslateOptions.rpcids,
  hl = defaultTranslateOptions.hl,
  tld = defaultTranslateOptions.tld
}: GenerateRequestUrlOptions = {}): string {
  if (!validateTLD(tld)) {
    throw new Error("Invalid TLD: Must be 2-63 letters only");
  }

  const searchParams = new URLSearchParams({
    rpcids: rpcids,
    "source-path": "/",
    hl: hl,
    "soc-app": "1",
    "soc-platform": "1",
    "soc-device": "1",
    rt: "c"
  });

  return `https://translate.google.${tld}/_/TranslateWebserverUi/data/batchexecute?${searchParams}`;
}
