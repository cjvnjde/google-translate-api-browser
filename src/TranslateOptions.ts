import { LangKey } from "./languages";

export type TranslateOptions = {
  from: LangKey;
  to: LangKey;
  hl: LangKey;
  tld: string;
  rpcids: string;
};
