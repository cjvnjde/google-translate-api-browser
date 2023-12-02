import { TranslateOptions } from "./TranslateOptions";

export type CreateRequestBodyOptions = Partial<Pick<TranslateOptions, "to" | "from" | "rpcids">>;
