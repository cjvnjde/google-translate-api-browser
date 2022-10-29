const { generateRequestUrl, normaliseResponse } = require('../../dist/index');
const https = require('https');

const url = generateRequestUrl('помогите, меня держат в рабстве');

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
