Based on [google-translate-api](https://github.com/matheuss/google-translate-api) and [google-translate-token](https://github.com/matheuss/google-translate-token)

## Install

```bash
npm install google-translate-api-browser
```

```bash
yarn add google-translate-api-browser
```

For cross origin requests it uses [cors-anywhere
](https://github.com/Rob--W/cors-anywhere). You can use public cors-anywhere server `https://cors-anywhere.herokuapp.com/` or set up your own. By default it does not use proxying.

## Examples

For browser

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
};
```

For node

```javascript
var { translate } = require("google-translate-api-browser");
var readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt("translate > ");
rl.prompt();

rl.on("line", function(line) {
  translate(line, { to: "en" })
    .then(res => {
      rl.setPrompt(line + " > " + res.text + "\ntranslate > ");
      rl.prompt();
    })
    .catch(err => {
      console.error(err);
    });
}).on("close", function() {
  process.exit(0);
});
```

## API

### setCORS(corsServerAddress)

#### corsServerAddress

Type: `string`

Address of CORS server for proxying requests to google translate.

### Returns a `translate` function

### translate(text, options)

#### text

Type: `string`

The text to be translated

#### options

Type: `object`

##### from

Type: `string` Default: `auto`

The `text` language. Must be `auto` or one of the codes/names (not case sensitive) contained in [languages.js](https://github.com/matheuss/google-translate-api/blob/master/languages.js)

##### to

Type: `string` Default: `en`

The language in which the text should be translated. Must be one of the codes/names (not case sensitive) contained in [languages.js](https://github.com/matheuss/google-translate-api/blob/master/languages.js).

##### raw

Type: `boolean` Default: `false`

If `true`, the returned object will have a `raw` property with the raw response (`string`) from Google Translate.

### Returns an `object`:

- `text` _(string)_ – The translated text.
- `from` _(object)_
  - `language` _(object)_
    - `didYouMean` _(boolean)_ - `true` if the API suggest a correction in the source language
    - `iso` _(string)_ - The [code of the language](https://github.com/matheuss/google-translate-api/blob/master/languages.js) that the API has recognized in the `text`
  - `text` _(object)_
    - `autoCorrected` _(boolean)_ – `true` if the API has auto corrected the `text`
    - `value` _(string)_ – The auto corrected `text` or the `text` with suggested corrections
    - `didYouMean` _(boolean)_ – `true` if the API has suggested corrections to the `text`
- `raw` _(string)_ - If `options.raw` is true, the raw response from Google Translate servers. Otherwise, `''`.

Note that `res.from.text` will only be returned if `from.text.autoCorrected` or `from.text.didYouMean` equals to `true`. In this case, it will have the corrections delimited with brackets (`[ ]`):

```js
translate("I spea Dutch")
  .then(res => {
    console.log(res.from.text.value);
    //=> I [speak] Dutch
  })
  .catch(err => {
    console.error(err);
  });
```
