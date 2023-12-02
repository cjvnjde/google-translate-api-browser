# Google translate api browser

[![npm - 4.2.4](https://img.shields.io/badge/npm-4.2.4-2ea44f?logo=npm&logoColor=%23CB3837)](https://www.npmjs.com/package/google-translate-api-browser)

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
import { translate } from "google-translate-api-browser";

translate("Je ne mangé pas six jours", { to: "en", corsUrl: "http://cors-anywhere.herokuapp.com/" })
  .then(res => {
    // I do not eat six days
    console.log(res.text)
  })
  .catch(err => {
    console.error(err);
  });
```

#### For node (commonjs)

You don't need to use CORS for node

```javascript
const { translate } = require('google-translate-api-browser');

translate("Je ne mangé pas six jours", { to: "en" })
  .then(res => {
    // I do not eat six days
    console.log(res.text)
  })
  .catch(err => {
    console.error(err);
  });
```

[Link to codesandbox](https://codesandbox.io/p/sandbox/google-translate-api-node-zgg694)
[Link to codesandbox with custom fetch function](https://codesandbox.io/p/sandbox/google-translate-api-node-custom-kr29rz)

#### For node (esm)

[Link to codesandbox](https://codesandbox.io/p/sandbox/google-translate-api-node-esm-3x22v2)

## API

### isSupported(lang: string): boolean
Verifies if the selected language is supported by Google Translate.

### translate(text: string, options: Partial<TranslateOptions>): Promise<TranslationResult>

#### text
The text to be translated

#### options
```typescript
type TranslateOptions = {
  rpcids: string;
  from: LangKey;
  to: LangKey;
  hl: LangKey;
  tld: string;
  raw: boolean;
}
```
##### example
```typescript
const options = {
  rpcids: 'MkEWBc',
  from: 'ua',
  to: 'en',
  hl: 'en',
  tld: 'com',
  raw: true,
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
  raw?: any;
}
```

Note that `from.text` will only be returned if `from.text.autoCorrected` or `from.text.didYouMean` equals to `true`. In this case, it will have the corrections delimited with brackets (`[ ]`):


### normaliseResponse(body: any, raw = false): TranslationResult
Formats the google translate response.

### generateRequestUrl(text: string, options: Partial<Omit<TranslateOptions, 'raw'>>): string
Generates a url to google translate api.
