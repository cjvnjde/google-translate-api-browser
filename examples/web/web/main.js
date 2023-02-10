import { setCORS } from "google-translate-api-browser";

const translate = setCORS('http://cors-anywhere.herokuapp.com/');

const rInp = document.getElementById('root__input');
const rTra = document.getElementById('translated');
const rBut = document.getElementById('root__button');

rBut.onclick = () => {
    rTra.innerHTML = '...';
    console.log(translate)
    translate(rInp.value, { to: 'en' })
        .then(res => {
            rTra.innerHTML = res.text;
        })
        .catch(err => {
            console.error(err);
        });
};
