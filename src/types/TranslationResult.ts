import { LanguageData } from "./LanguageData";

export type TranslationResult = {
  text: string;
  pronunciation: string;
  from: LanguageData;
  raw?: any;
};
