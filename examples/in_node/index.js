var { translate } = require("google-translate-api-browser");
// var { translate } = require("../../dist/index");

var readline = require("readline");
console.log(translate);
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
