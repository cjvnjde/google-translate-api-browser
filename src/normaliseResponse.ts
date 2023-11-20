export type LanguageData = {
  language: {
    didYouMean: boolean;
    iso: string;
  };
  text: {
    autoCorrected: boolean;
    value: string;
    didYouMean: boolean;
  }
}

export type TranslationResult = {
  text: string;
  pronunciation: string;
  from: LanguageData;
  raw?: any;
}

export function normaliseResponse(rawBody: string, raw = false): TranslationResult {
  const content = rawBody.match(/"\[.*]"/)

  let data: any[] | null = null

  if (content) {
    let valuableContent = content[0]

    data = JSON.parse(JSON.parse(valuableContent))
  }

  if (!data) {
    throw new Error('No data')
  }

  const result: TranslationResult = {
    text: data[1][0][0][5][0][0],
    pronunciation: data[0][0],
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
