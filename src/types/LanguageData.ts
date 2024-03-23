export type LanguageData = {
  language: {
    didYouMean: boolean;
    iso: string;
  };
  text: {
    autoCorrected: boolean;
    value: string;
    didYouMean: string | null;
  };
};
