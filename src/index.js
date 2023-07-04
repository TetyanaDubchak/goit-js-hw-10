import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "live_ifYEKjAPHTIh5Jo0el1oTPVTiBdDHxjjlUD6ithjbmMrCDu08ALmrMtNGMSBMhwi";

import {fetchBreeds, fetchCatByBreed} from './cat-api';

const selectBreeds = document.querySelector('.breed-select');
const wrapperForCats = document.querySelector('.cat-info');
const failureText = document.querySelector('.error');
const loaderImg = document.querySelector('.loader');

fetchBreeds().then(data => {
    
    setTimeout(() => {
        selectBreeds.style.display = 'flex';
        const makeOptionInSelect = ({ id, name }) => `<option value = '${id}'> ${name} </option>`;
   
        const markUp = data.map(obj => makeOptionInSelect(obj));

        loaderImg.style.display = 'none';

        selectBreeds.insertAdjacentHTML('beforeend', markUp);
        new SlimSelect({
            select: '.breed-select',
        })
    }, 1000)}).catch(err => {
        Notiflix.Notify.failure(failureText);
});


selectBreeds.addEventListener("change", onSelectCat);

function onSelectCat(e) {
    e.preventDefault();
    wrapperForCats.innerHTML = "";
    const selectQueryId = e.target.value;
    loaderImg.style.display = 'flex';
    
    fetchCatByBreed(selectQueryId).
        then(catData => {
            loaderImg.style.display = 'none';
            createCatMarkUp(catData); 
        }).
        catch(err => { Notiflix.Notify.failure(failureText) });
    
};

function createCatMarkUp(arr) {
    const makeCatMark = ({url, breeds}) => {
        return `<img class="img-cat" src='${url}' alt="" /> 
       <div class = "cat-wrap">
       <h2 class="cat-name"> ${breeds[0].name} </h2>
        <p class="cat-describe">${breeds[0].description}</p>
        <p class="cat-temp"><span>Temperament:</span>${breeds[0].temperament}</p> </div>
        `
    };
    const markUpCat = arr.map(obj => makeCatMark(obj)).join('');
    wrapperForCats.innerHTML = markUpCat;
};


