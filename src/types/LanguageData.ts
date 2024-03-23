export type LanguageData = {
  language: {
    didYouMean: boolean;
    iso: string;
  };
  text: {
    pronunciation: string | null;
    autoCorrected: boolean;
    value: string;
    didYouMean: string | null;
  };
};
