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
    })
        
}).catch(err => Notiflix.Notify.failure(failureText));


selectBreeds.addEventListener("change", onSelectCat);

function onSelectCat(e) {
    e.preventDefault();
    const selectQueryId = e.target.value;

    fetchCatByBreed(selectQueryId).
        then(catData => {
            console.log(catData);
            createCatMarkUp(catData); 
            wrapperForCats.innerHTML = createCatMarkUp(catData)
        }).
        catch(err => console.log(err));
};

function createCatMarkUp(arr) {
    const makeCatMark = ({ url, breeds: name, breeds: wikipedia_url, breeds: temperament }) => {
        `<img class="img-cat" src='${url}' alt="" /> 
        <h2 class="cat-name"> ${name} </h2>
        <p class="cat-describe">${wikipedia_url}</p>
        <p class="cat-temp">${temperament}</p>`
    };
    const markUpCat = arr.map(obj => makeCatMark(obj)).join('');
    console.log(markUpCat);
    
    
}

Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");