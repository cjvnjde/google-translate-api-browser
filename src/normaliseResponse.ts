import { RawContentType, RawTranslationResponse, TranslationResult } from "./types/TranslationResult";

function parseData(data: string) {
  try {
    const content: RawContentType = JSON.parse(data.replace(/^\)]}'/, ""));
    const translationResponse: RawTranslationResponse = JSON.parse(content[0][2]);

    return translationResponse;
  } catch (e) {
    throw new Error("Data is either empty or corrupted");
  }
}

export function normaliseResponse(rawBody: string, raw = false): TranslationResult {
  const data = parseData(rawBody);
  const translatedPhrases = data[1][0][0][5];
  const text = translatedPhrases.reduce<string>((fullText, [textBlock]) => {
    return fullText ? `${fullText} ${textBlock}` : textBlock;
  }, "");

  const result: TranslationResult = {
    text,
    pronunciation: data[1][0][0][1],
    from: {
      language: {
        didYouMean: Boolean(data[0][1]),
        iso: data[2]
      },
      text: {
        pronunciation: data[0][0],
        autoCorrected: Boolean(data[0][1]),
        value: data[0][6][0],
        didYouMean: data[0][1] ? data[0][1][0][4] : null
      }
    }
  };

  if (raw) {
    result.raw = data;
  }

  return result;
}
