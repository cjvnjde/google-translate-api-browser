# Google translate api browser

[![NPM Version](https://img.shields.io/npm/v/google-translate-api-browser)](https://www.npmjs.com/package/google-translate-api-browser)

## Install

```bash
npm install google-translate-api-browser
```

For cross origin requests it uses [cors-anywhere](https://github.com/Rob--W/cors-anywhere). You can use public cors-anywhere server `https://cors-anywhere.herokuapp.com/` or set up your own. By default it does not use proxying.

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
      autoCorrected: boolean; 
      value: string;
      didYouMean: string;
    }
  };
  raw?: any;
}
```

### normaliseResponse(body: any, raw = false): TranslationResult
Formats the google translate response.

### generateRequestUrl(text: string, options: Partial<Omit<TranslateOptions, 'raw'>>): string
Generates a url to google translate api.
