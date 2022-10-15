let container = document.querySelector(".pokemons");
let selectPage = document.querySelector("#pagination");
let navigation = document.querySelector(".navigation .numbers");

let pokemons = [];
const pokeUrl = "https://pokeapi.co/api/v2/";
let prevLink = "";
let nextLink = "";
let count = 0;
let perPage = 40;

//let selectedValue = selectBox.options[selectBox.selectedIndex].value;

/* fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson.results);
        pokemons = responseJson.results;
        container.innerHTML = pokemons;
    }) */

const changePg = (value) => {
    //console.log("value: ", value);
    let newUrl = `${pokeUrl}pokemon?limit=${value}`;
    perPage = value;
    getPokemons(newUrl);
}
const prev = () => {
    getPokemons(prevLink);
}
const next = () => {
    getPokemons(nextLink);
}

const getPokemons = (url) => {
    //let newUrl = `${pokeUrl}pokemon?limit=${limit}`;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            prevLink = responseJson.previous;
            nextLink = responseJson.next;
            count = responseJson.count;
            addNumbers(count);
            //pokemons = responseJson.results;
            showPokemons(responseJson.results);
            console.log("pages: ", count/perPage);
        })

}

const showPokemons = (array) => {
    //console.log("new: ",array);
    clearContainer();
    array.map(item => {
        fetch(item.url)
            .then(response => response.json())
            .then(data => {
                //console.log("data: ", data)
                loadCard(data);
            })

        /* container.innerHTML = `<p>${item.name}</p>`; */
    })
}
const loadCard = (data) => {
    
    let card = document.createElement("div"); 
    let content = `
        <img src="${data.sprites.other.home.front_default}" alt="${data.name}">
        <p>${data.name}</p>
        <p class="order"> #${data.order}</p>
    `;
    card.innerHTML = content;
    container.appendChild(card);

}
const clearContainer = () => {
    container.innerHTML = "";
}
const clearNavigation = () => navigation.innerHTML="";
const addNumbers = (count) => {
    clearNavigation();
    const pages = count/perPage;
    for (let index = 0; index < pages; index++) {
        let number = document.createElement("span");
        //number.classList.add(`element-${index}`);
        const numLink = `<button onclick="actionNumber(${index})">${index+1}</button>`
        number.innerHTML = numLink;
        navigation.appendChild(number);
    }
}
const actionNumber = (index) => {
    //const active = document.querySelector(`.numbers .element-${index}`);
    //console.log("element: ", active);
    //active.classList.add("res");
    console.log('call action: ', index);
    const newLink = `https://pokeapi.co/api/v2/pokemon?offset=${index*perPage}&limit=${perPage}`;
    console.log("current: ",newLink);
    getPokemons(newLink);
}

console.log("returls: ",  getPokemons(`${pokeUrl}pokemon?limit=40`));
