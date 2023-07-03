import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "live_ifYEKjAPHTIh5Jo0el1oTPVTiBdDHxjjlUD6ithjbmMrCDu08ALmrMtNGMSBMhwi";

import {fetchBreeds, fetchCatByBreed} from './cat-api';

const selectBreeds = document.querySelector('.breed-select');
const wrapperForCats = document.querySelector('.cat-info');
const failureText = document.querySelector('.error');


fetchBreeds().then(data => {
    
    const makeOptionInSelect = ({ id, name }) => `<option value = '${id}'> ${name} </option>`;
   
    const markUp = data.map(obj => makeOptionInSelect(obj));

    selectBreeds.insertAdjacentHTML('beforeend', markUp);
    new SlimSelect({
        select: '.breed-select',
    });
        
}).catch(err => Notiflix.Notify.failure(failureText));


selectBreeds.addEventListener("change", onSelectCat);

function onSelectCat(e) {
    e.preventDefault();
    const selectQueryId = e.target.value;

    fetchCatByBreed(selectQueryId).
        then(catData => {
            console.log(catData);
            createCatMarkUp(catData); 
        }).
        catch(err => Notiflix.Notify.failure(failureText));
};

function createCatMarkUp(arr) {
    const makeCatMark = ({ url, breeds}) => {
        `<img class="img-cat" src='${url}' alt="" /> 
        <h2 class="cat-name"> ${breeds[0].name} </h2>
        <p class="cat-describe">${breeds[0].description}</p>
        <p class="cat-temp">${breeds[0].temperament}</p>`
    };
    const markUpCat = arr.map(obj => makeCatMark(obj)).join('');
    console.log(makeCatMark);
    wrapperForCats.innerHTML = markUpCat;
};

