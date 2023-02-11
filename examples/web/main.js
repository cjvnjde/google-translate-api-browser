import { translate } from "google-translate-api-browser";

const rInp = document.getElementById('root__input');
const rTra = document.getElementById('translated');
const rBut = document.getElementById('root__button');

rBut.onclick = () => {
    rTra.innerHTML = '...';

    translate(rInp.value, { to: 'en', corsUrl: 'http://cors-anywhere.herokuapp.com/' })
        .then(res => {
            rTra.innerHTML = res.text;
        })
        .catch(err => {
            console.error(err);
        });
};
