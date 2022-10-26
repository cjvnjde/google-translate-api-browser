import {getCode, isSupported} from "./languages";
import sM from "./sM";
import {normaliseResponse, TranslationResult} from "./normaliseTranslateResponse";

type TranslateOptions = {
    from: string;
    to: string;
    hl: string;
    raw: boolean;
    tld: string;
}

const defaultTranslateOptions: TranslateOptions = {
    from: "auto",
    to: "en",
    hl: "en",
    raw: false,
    tld: "com"
};

let CORSUrl: string = "";

// setup your own cors-anywhere server
export const setCORS = (CORSURL: string) => {
    CORSUrl = CORSURL;
    return translate;
};

export function generateRequestUrl(text: string, options: Partial<TranslateOptions>): string {
    const translateOptions = {...defaultTranslateOptions, ...options};

    [translateOptions.from, translateOptions.to].forEach(lang => {
        if (!lang || !isSupported(lang)) {
            throw new Error(`"The language '${lang}' is not supported"`);
        }
    });

    const queryParams = {
        client: "gtx",
        sl: getCode(translateOptions.from),
        tl: getCode(translateOptions.to),
        hl: getCode(translateOptions.hl),
        ie: "UTF-8",
        oe: "UTF-8",
        otf: '1',
        ssel: '0',
        tsel: '0',
        kc: '7',
        q: text,
        tk: sM(text)
    };
    const searchParams = new URLSearchParams(queryParams);

    [
        "at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"
    ].forEach(l => searchParams.append('dt', l))
    return `https://translate.google.${translateOptions.tld}/translate_a/single?${searchParams}`;
}

async function translate(text: string, options: Partial<TranslateOptions> = {}): Promise<TranslationResult> {
    const translateUrl = generateRequestUrl(text, options);
    const response = await fetch(`${CORSUrl}${translateUrl}`);

    if (!response.ok) {
        throw new Error('Request failed')
    }

    const body = await response.json()
    return normaliseResponse(body)
}

export default translate;
