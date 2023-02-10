# Google translate api browser

[![npm - 3.0.1](https://img.shields.io/badge/npm-3.0.1-2ea44f?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/google-translate-api-browser)

Based on [google-translate-api](https://github.com/matheuss/google-translate-api) and [google-translate-token](https://github.com/matheuss/google-translate-token)

## Install

```bash
npm install google-translate-api-browser
```

For cross origin requests it uses [cors-anywhere
](https://github.com/Rob--W/cors-anywhere). You can use public cors-anywhere server `https://cors-anywhere.herokuapp.com/` or set up your own. By default it does not use proxying.

## Examples

#### For browser

```javascript
import { setCORS } from "google-translate-api-browser";
// setting up cors-anywhere server address
const translate = setCORS("http://cors-anywhere.herokuapp.com/");
/*
// or
import translate, { setCORS } from "google-translate-api-browser";
setCORS("http://cors-anywhere.herokuapp.com/");
*/
translate("Je ne mangé pas six jours", { to: "en" })
  .then(res => {
    // I do not eat six days
    console.log(res.text)
  })
  .catch(err => {
    console.error(err);
  });
```

#### For node

You don't need to use CORS for node

```javascript
const { generateRequestUrl, normaliseResponse } = require('google-translate-api-browser');
const https = require('https');

const url = generateRequestUrl('Je ne mangé pas six jours', { to: "en" });

https.get(url, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log(normaliseResponse(JSON.parse(data)));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
```

## API

### isSupported(lang: string): boolean
Verifies if the selected language is supported by Google Translate.

### translate(text: string, options: Partial<TranslateOptions>): Promise<TranslationResult>

#### text
The text to be translated

#### options
```typescript
type TranslateOptions = {
  client: 'gtx' | 'webapp';
  from: LangKey;
  to: LangKey;
  hl: LangKey;
  raw: boolean;
  tld: string;
}
```
##### example
```typescript
const options = {
  client: 'gtx',
  from: 'ua',
  to: 'en',
  hl: 'en',
  raw: false,
  tld: 'com',
}
```
#### returns
```typescript
type TranslationResult = {
  text: string; // The translated text.
  pronunciation: string;
  from: {
    language: {
      didYouMean: boolean; // `true` if the API suggest a correction in the source language
      iso: string; // The code of the language that the API has recognized in the `text`
    };
    text: {
      autoCorrected: boolean; // `true` if the API has auto corrected the `text`
      value: string; // The auto corrected `text` or the `text` with suggested corrections
      didYouMean: boolean; // `true` if the API has suggested corrections to the `text`
    }
  };
  raw?: any; // If `options.raw` is true, the raw response from Google Translate servers
}
```

Note that `from.text` will only be returned if `from.text.autoCorrected` or `from.text.didYouMean` equals to `true`. In this case, it will have the corrections delimited with brackets (`[ ]`):


### normaliseResponse(body: any, raw = false): TranslationResult
Formats the google translate response.

### generateRequestUrl(text: string, options: Partial<Omit<TranslateOptions, 'raw'>>): string
Generates a url to google translate api.

### setCORS(CORSURL: string): translate
