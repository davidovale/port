//ctrl + k + f

export default class Pokedex {
    constructor() {
        this.firstPokemon = "";
        
    }

    init(){
        this.callPokemon();
    }

    callPokemon() {
        const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

        const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
            fetch(getPokemonUrl(index + 1)).then(response => response.json()))

        const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
            const elementTypes = types.map(typeInfo => typeInfo.type.name)

            if (this.firstPokemon == ""){
                if (id == 1 || id == 4 || id == 7){
                    accumulator += `
                    <li class="card ${elementTypes[0]}">
                        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                        <h2 class="card-title">${id}. ${name}</h2>
                        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
                    </li>
                `
                }
            }

            

            return accumulator
        }, '')

        const insertPokemonsIntoPage = pokemons => {
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons
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