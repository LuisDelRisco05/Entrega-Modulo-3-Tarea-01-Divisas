import { monedas } from "./utils/monedas.js";

const api = "https://api.exchangerate-api.com/v4/latest/USD";
  
const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const fromCurrecy = document.querySelector(".from");
const toCurrecy = document.querySelector(".to");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.querySelector("#finalAmount");
const inputNull = document.querySelector("#oamount");
const divInput = document.querySelector('#div-input');
const divError = document.querySelector("#error");

let resultFrom;
let resultTo;
let searchValue;

document.addEventListener('DOMContentLoaded', () => {
    opciones();
})

function opciones(){

    monedas.forEach(moneda =>{
        // opcion divisa #1
        const opcTagUno = document.createElement("option");
        opcTagUno.textContent = moneda.name; 
        fromCurrecy.appendChild(opcTagUno);
        opcTagUno.setAttribute('value', moneda.value);
        opcTagUno.setAttribute('name', moneda.name);
    
        // opcion divisa #2
        const opcTagDos = document.createElement("option");
        opcTagDos.textContent = moneda.name; 
        toCurrecy.appendChild(opcTagDos);
        opcTagDos.setAttribute('value', moneda.value);
        opcTagDos.setAttribute('name', moneda.name);
    
    });
} 
// select 1 atento a cambio
fromCurrecy.addEventListener('change', e => {
    resultFrom = `${e.target.value}`;
    console.log(resultFrom);
});
  
// select 2 atento a cambio
toCurrecy.addEventListener('change', e => {
    resultTo = `${e.target.value}`;
    console.log('to');
});
  
search.addEventListener('input', updateValue);
  
// buscar valor
function updateValue(e) {
    searchValue = e.target.value;
    console.log(searchValue);
}
// atributo para ocultar div #error
divError.setAttribute('class', 'visually-hidden');
  
// cuando usuario da click
convert.addEventListener("click", getResults);
  

function getResults() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResults);

    const cantidad =  inputNull.value;

    console.log(cantidad);

    if(!cantidad.trim()){

        divError.classList.remove('visually-hidden'); 
        divError.textContent = `Digite la cantidad`;
        divError.style.backgroundColor = 'red';
        divError.classList ='alert alert-danger w-50 mt-2 rounded-3 p-3 text-light border-0';
        
        divInput.appendChild(divError);
    
        return;
    }

    divError.classList= 'visually-hidden';  
}
  
// resultados
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    finalValue.innerHTML = 
       ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}
  