//ctrl + k + f

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

function firstChoice(id){
    alert("works ",id);
}

function test(){
    alert("work");
}