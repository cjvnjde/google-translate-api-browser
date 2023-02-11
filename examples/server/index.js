const { translate } = require('google-translate-api-browser');

translate('помогите').then((data) => {
  console.log(data)
})
