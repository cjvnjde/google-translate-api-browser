import langs from "./languages";
import { LangKey } from "./types/LangKey";

export const isLanguageSupported = (desiredLang: LangKey): boolean => {
  return Boolean(langs[desiredLang]);
};
