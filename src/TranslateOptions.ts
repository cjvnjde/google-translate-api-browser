import { LangKey } from "./languages";

export type TranslateOptions = {
  from: LangKey;
  to: LangKey;
  hl: LangKey;
  raw: boolean;
  tld: string;
  rpcids: string;
}
