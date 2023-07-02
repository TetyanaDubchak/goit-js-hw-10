import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_ifYEKjAPHTIh5Jo0el1oTPVTiBdDHxjjlUD6ithjbmMrCDu08ALmrMtNGMSBMhwi";

import {fetchBreeds, fetchCatByBreed} from './cat-api';

const selectBreeds = document.querySelector('.breed-select');
const wrapperForCats = document.querySelector('.cat-info');


fetchBreeds('').then(data => {
    
     const makeOptionInSelect = ({ id, name }) => `<option value = '${id}'> ${name} </option>`;
    
    const markUp = data.map(obj => makeOptionInSelect(obj));

    selectBreeds.insertAdjacentHTML('beforeend', markUp);
        
    }).catch(err => console.log(err));


selectBreeds.addEventListener("change", onSelectCat);

function onSelectCat(e) {
    e.preventDefault();
    const selectQueryId = e.target.value;

    fetchCatByBreed(selectQueryId).
        then(catData => {
            console.log(catData);
            createCatMarkUp(catData);
        }).
        catch(err => console.log(err));
};

function createCatMarkUp(arr) {
    const makeCatMark = ({ url, name, wikipedia_url, temperament }) => {
        `<img class="img-cat" src='${url}' alt="" /> 
        <h2 class="cat-name"> ${name} </h2>
        <p class="cat-describe">${wikipedia_url}</p>
        <p class="cat-temp">${temperament}</p>`
    };
    const markUpCat = arr.map(obj => makeCatMark(obj)).join('');
   return wrapperForCats.insertAdjacentHTML('beforeend', markUpCat);
    
}

