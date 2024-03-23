import { LangKey } from "./LangKey";

type Headers = {
  [key: string]: string | string[];
};

export type TranslateOptions = {
  from: LangKey;
  to: LangKey;
  hl: LangKey;
  tld: string;
  rpcids: string;
  headers?: Headers;
};
