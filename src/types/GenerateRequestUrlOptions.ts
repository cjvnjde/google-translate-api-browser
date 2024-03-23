import { TranslateOptions } from "./TranslateOptions";

export type GenerateRequestUrlOptions = Partial<Pick<TranslateOptions, "rpcids" | "hl" | "tld">>;
