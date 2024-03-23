import { TranslateOptions } from "./TranslateOptions";

export type BrowserTranslateOptions = Partial<
  TranslateOptions & {
    corsUrl: string;
    raw: boolean;
  }
>;
