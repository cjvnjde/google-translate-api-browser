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

export function normaliseResponse(body: any, raw = false): TranslationResult {
  const result: TranslationResult = {
    text: '',
    pronunciation: '',
    from: {
      language: {
        didYouMean: false,
        iso: '',
      },
      text: {
        autoCorrected: false,
        value: '',
        didYouMean: false,
      },
    },
  };
  body[0].forEach((obj: any) => {
    if (obj[0]) {
      result.text += obj[0];
    } else if (obj[2]) {
      result.pronunciation += obj[2];
    }
  });
  if (body[2] === body[8][0][0]) {
    result.from.language.iso = body[2];
  } else {
    result.from.language.didYouMean = true;
    result.from.language.iso = body[8][0][0];
  }
  if (body[7] && body[7][0]) {
    let str = body[7][0];

    str = str.replace(/<b><i>/g, '[');
    str = str.replace(/<\/i><\/b>/g, ']');

    result.from.text.value = str;

    if (body[7][5] === true) {
      result.from.text.autoCorrected = true;
    } else {
      result.from.text.didYouMean = true;
    }
  }

  if (raw) {
    result.raw = body;
  }

  return result;
}
