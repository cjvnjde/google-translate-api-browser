import { LanguageData } from "./LanguageData";
import { LangKey } from "./LangKey";

type PotentiallyJsonString = string;
export type RawContentType = [[string, string, PotentiallyJsonString, null, null, null, string], [string, number], [string, number, string, number]]
type FromLangKey = LangKey;
type ToLangKey = LangKey;
type Transliteration = string;
type DidYouMean = [[[null, string], null, number, [number], string]];
type AutoDetectedLanguageKey = LangKey;
type RequestData = any;
type TranslatedPhrase = [string];
export type RawTranslationResponse = [[
    Transliteration | null,
    DidYouMean | null,
    AutoDetectedLanguageKey | null,
  any,
  null,
  null,
  RequestData,
], [
  [
    [
      null, null | Transliteration, null, null | boolean, null,
      TranslatedPhrase[], null, null, null, []
    ]
  ], ToLangKey, number, FromLangKey,
  [string, LangKey, LangKey, boolean]
], string]

export type TranslationResult = {
  text: string;
  pronunciation: string | null;
  from: LanguageData;
  raw?: RawTranslationResponse;
};
