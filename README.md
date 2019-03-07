Based on [google-translate-api](https://github.com/matheuss/google-translate-api) and [google-translate-token](https://github.com/matheuss/google-translate-token)

## Try to use

```bash
npm install google-translate-api-browser -S
```

```bash
yarn add google-translate-api-browser
```

For cross origin requests it uses [cors-anywhere
](https://github.com/Rob--W/cors-anywhere). You can use public cors-anywhere server https://cors-anywhere.herokuapp.com/ or set up your own.

## Example

```javascript
import translate, { setCORS } from "google-translate-api-browser";

// setting up cors-anywhere server address
setCORS("http://cors-anywhere.herokuapp.com/");

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
