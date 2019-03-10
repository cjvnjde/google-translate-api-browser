import { stringify } from "querystring";
import axios from "axios";
import sM from "./sM";
import { isSupported, getCode } from "./languages";
interface TranslateOptions {
  from: string;
  to: string;
  raw: boolean;
}

interface Token {
  name: string;
  value: string;
}

function token(text: string) {
  return new Promise<Token>(resolve => {
    resolve({ name: "tk", value: sM(text) });
  });
}

let CORSService: string = "";

// setup your own cors-anywhere server
export const setCORS = (CORSURL: string) => {
  CORSService = CORSURL;
  return translate;
};

// function translate(text: string, to: string, from?: string) {
export function translate(
  text: string,
  opts_: { from?: string; to?: string; raw?: boolean } = {}
) {
  const opts: TranslateOptions = {
    from: opts_.from || "auto",
    to: opts_.to || "en",
    raw: opts_.raw || false
  };

  let e: Error | null = null;
  [opts.from, opts.to].forEach(lang => {
    if (lang && !isSupported(lang)) {
      e = new Error();
      e.message = "The language '" + lang + "' is not supported";
    }
  });

  if (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }

  return token(text)
    .then((token: Token) => {
      const url = "https://translate.google.com/translate_a/single";
      const data: any = {
        client: "gtx",
        sl: getCode(opts.from),
        tl: getCode(opts.to),
        hl: getCode(opts.to),
        dt: ["at", "bd", "ex", "ld", "md", "qca", "rw", "rm", "ss", "t"],
        ie: "UTF-8",
        oe: "UTF-8",
        otf: 1,
        ssel: 0,
        tsel: 0,
        kc: 7,
        q: text
      };
      data[token.name] = token.value;
      return url + "?" + stringify(data);
    })
    .then(url => {
      return axios
        .get(CORSService + url)
        .then(res_ => {
          const res = {
            body: JSON.stringify(res_.data)
          };
          const result = {
            text: "",
            from: {
              language: {
                didYouMean: false,
                iso: ""
              },
              text: {
                autoCorrected: false,
                value: "",
                didYouMean: false
              }
            },
            raw: opts.raw ? res.body : ""
          };

          const body = JSON.parse(res.body);

          body[0].forEach((obj: any) => {
            if (obj[0]) {
              result.text += obj[0];
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

            str = str.replace(/<b><i>/g, "[");
            str = str.replace(/<\/i><\/b>/g, "]");

            result.from.text.value = str;

            if (body[7][5] === true) {
              result.from.text.autoCorrected = true;
            } else {
              result.from.text.didYouMean = true;
            }
          }
          return result;
        })
        .catch(err => {
          const e: Error = new Error();
          if (err.statusCode !== undefined && err.statusCode !== 200) {
            e.message = "BAD_REQUEST";
          } else {
            e.message = "BAD_NETWORK";
          }
          throw e;
        });
    });
}

export default translate;
