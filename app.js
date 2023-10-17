const allPokemonList = document.querySelector( "#all-pokemon" );
let pokemonCatch = []
let pokemonTypeList = [];

let pokemon = "pokemon";
let URL = `https://pokeapi.co/api/v2/`;

function onLoadFetchPokemon(){
    for ( let i=1; i <= 151; i++) {
        fetch ( URL + `${pokemon}/`+ i )
        .then( (response) => response.json())
        .then( data => {
            showPokemon(data)
            data.types.map( ( type ) => {
                if ( !pokemonTypeList.includes(type.type.name) ) {
                    pokemonTypeList.push(type.type.name);
                    pokemonTypeButton(type.type.name)
                }
            })
        })
    }
}

function pokemonTypeButton(pokeTypes) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerHTML = `<button id="${pokeTypes}" class="btn btn-header ${pokeTypes}">${pokeTypes}</button>`;
    ul.appendChild(li);
}

function showPokemon( data ) {
    const div =  document.createElement("div");
    div.classList.add("pokemon");

    let pokeId = data.id.toString();
    if ( pokeId.length === 1 ) {
        pokeId = "00" + pokeId;
    }

    if ( pokeId.length === 2 ){
        pokeId = "0" + pokeId;
    }

    let types = data.types.map( 
        type =>
            `<p class="type ${type.type.name}">${type.type.name}</p>`,
        );
    types=types.join('');
    data.types.map( 
            type => div.classList.add(`${type.type.name}`)
        );

    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-image">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
        </div>
        <div class="pokemon-info">
            <div class="name-contianer">
                <p class="${pokeId}">#${pokeId}</p>
                <h2 class="${data.name}">${data.name}</h2>
            </div>
            <div class="pokemon-type">
            ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat high">${data.height}m</p>
                <p class="stat weight">${data.weight}Kg</p>
            </div>
        </div>
    `;
    insertPokemon(div);
}

function insertPokemon( div ) {
    allPokemonList.append( div );
}

onLoadFetchPokemon();

function buttonsAcction () {
    let buttonPokemon = document.querySelectorAll(".btn-header");
    let pokemonCards = document.querySelectorAll(".pokemon");
    buttonPokemon.forEach( button => button.addEventListener( "click", ( event )=> {
        const buttonId = event.currentTarget.id;
        for( i=0; i <= pokemonCards.length; i++ ) {
            
            let cardClass = pokemonCards[i].className;
            if ( !cardClass.includes( buttonId ) ){
                pokemonCards[i].classList.add("hide");
            } else {
                pokemonCards[i].classList.remove("hide")
            }
            
            if ( buttonId.includes("see-all") ){
                pokemonCards[i].classList.remove("hide")
            }
        }
    }));
}

setTimeout( window.onload = ( ) => {
        buttonsAcction();
    }, 2000
)