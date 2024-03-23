import { TranslateOptions } from "./TranslateOptions";

export type ServerTranslateOptions = Partial<
  TranslateOptions & {
    raw: boolean;
  }
>;
