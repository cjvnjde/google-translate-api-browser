import { TranslationResult } from "./types/TranslationResult";

export function normaliseResponse(rawBody: string, raw = false): TranslationResult {
  const content = rawBody.match(/"\[.*]"/);

  let data: any | null = null;

  if (content) {
    let valuableContent = content[0];

    data = JSON.parse(JSON.parse(valuableContent));
  }

  if (!data) {
    throw new Error("Data is either empty or corrupted");
  }

  const translatedPhrases: [string][] = data[1][0][0][5];
  const text = translatedPhrases.reduce<string>((fullText, textBlock) => {
    return fullText ? `${fullText} ${textBlock[0]}` : textBlock[0];
  }, "");

  const result: TranslationResult = {
    text,
    pronunciation: data[1][0][0][1],
    from: {
      language: {
        didYouMean: Boolean(data[0][1]),
        iso: data[2],
      },
      text: {
        autoCorrected: Boolean(data[1][0][0][3]),
        value: Boolean(data[0][1]) ? data[0][1][0][4] : data[0][6][0],
        didYouMean: Boolean(data[0][1]),
      },
    },
  };

  if (raw) {
    result.raw = rawBody;
  }

  return result;
}
