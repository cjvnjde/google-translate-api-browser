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
