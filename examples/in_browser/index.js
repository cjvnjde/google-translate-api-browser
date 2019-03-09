import { setCORS } from "google-translate-api-browser";

// setting up cors-anywhere server address
const translate = setCORS("http://cors-anywhere.herokuapp.com/");

const rInp = document.getElementById("root__input");
const rTra = document.getElementById("translated");
const rBut = document.getElementById("root__button");

rBut.onclick = e => {
  rTra.innerHTML = "...";
  translate(rInp.value, { to: "en" })
    .then(res => {
      rTra.innerHTML = res.text;
    })
    .catch(err => {
      console.error(err);
    });
};
