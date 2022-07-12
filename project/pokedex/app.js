//ctrl + k + f

export default class Pokedex{

    callPokemon(counter=0, loop=false){
        const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pokemonPromises = []
        
        if(loop == false && counter == 0){
            for (let i=1; i<=7; i= i+3){
                pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
            }
        }else if(loop == false){
            for (let i=1; i<=7; i= i+3){
                pokemonPromises.push(fetch(getPokemonUrl(counter)).then(response => response.json()));
            }
        }else{
            for (let i=1; i<=150; i= i++){
                pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
            }
        }
        
    
        Promise.all(pokemonPromises)
        .then(pokemons => {
            setPage(pokemons);
        })
        
    }
}

function setPage(e){
    let types = [];
    e.forEach(element => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");

        const id = element.id;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        div.setAttribute('class',`card ${element.types[0].type.name}`);
        div.setAttribute('id',`${id}`);

        img.setAttribute('class','card-image');
        img.setAttribute('alt',element.name);
        img.setAttribute('src',image);

        h2.setAttribute('class','card-title');
        h2.innerHTML = `${id} - ${element.name}`;

        let types = element.types.map(typeInfo => typeInfo.type.name);
        types = types.toString();
        types = types.replaceAll(',',' | ');
        p.setAttribute('class', 'card-subtitle');
        p.innerHTML = types;

        const divPokedex = document.querySelector('[data-js="pokedex"]');
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        divPokedex.appendChild(div);

        div.onclick = function(){
            let aux = div;
            while (divPokedex.firstChild){
                divPokedex.removeChild(divPokedex.firstChild);
            }
            divPokedex.appendChild(div);
            sessionStorage.setItem('pokemonChosen',this.id);
            //console.log(this.id);
            window.location.href = "../project/index.html";

        }

        
    });
    
}




/**

 
export default class Pokedex {
    constructor() {
        this.firstPokemon = "";
        this.count = 0;
    }

    init(){

    }

    callPokemon(name) {
        const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

        const generatePokemonPromises = () => Array(10).fill().map((_, index) =>
            fetch(getPokemonUrl(index + 1)).then(response => response.json()))

        const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
            const elementTypes = types.map(typeInfo => typeInfo.type.name)

            if (this.firstPokemon == ""){
                if (id == 1 || id == 4 || id == 7){
                    accumulator += `
                    
                    <section class="card ${elementTypes[0]}" id="section_${id};">
                    <form name="form_firstPokemon_${id}" method="get">
                        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                        <h2 class="card-title">${id}. ${name}</h2>
                        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
                        <input type="submit" name="btn_pokemon" value="${id}">
                        </form>
                    </section>
                    
                `
                }
            }
            
            return accumulator
        }, '')

        const insertPokemonsIntoPage = pokemons => {
            const ul = document.querySelector('[data-js="pokedex"]');
            if (ul != null){
                ul.innerHTML = pokemons;
                document.getElementById('span_player').innerHTML = name;
            }
            
        }

        const pokemonPromises = generatePokemonPromises()

        Promise.all(pokemonPromises)
            .then(generateHTML)
            .then(insertPokemonsIntoPage)
    }

    async saveFirstPokemon(e){
        this.firstPokemon = e;
    }

}

const myController = new Pokedex('#pokedex');
myController.init(myController);

*/