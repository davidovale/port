//ctrl + k + f
 
export default class Pokedex {
    constructor() {
        
    }

    init(){
        this.pokemonListBasic = [{
            type: 'easy',
            id: [1,4,7,10,13,16,19,21,23,25,27,29,32,35,37,39,41,43,46,48,50,52,54,56,58,60,63,66,69,72,74,77,
                79,81,83,84,86,88,90,92, 95, 96, 98,100,102,104,109,111,113,116,118,120,129,133,138,140]
        },
        {
            type: 'medium',
            id: [2,5,8,11,15,17,20,22,24,26,28,30,33,36,38,40,42,49,53,55,57,59,61,64,67,70,73,74,78,80,93]
        },
        {
            type: 'hard',
            id: [3,6,9,12,14,18,31,34,44,45,47,51,62,65,68,71,75]
        }
    ];

        

        return this.pokemonListBasic;
    }

    callPokemon(name) {
        const pokemonsList = [];
        const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

        const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
            fetch(getPokemonUrl(index + 1)).then(response => response.json()))
        
        const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
            const elementTypes = types.map(typeInfo => typeInfo.type.name);

           // if (this.firstPokemon == ""){
                //if (id == 1 || id == 4 || id == 7){
                    accumulator += `
                    
                    <section class="card ${elementTypes[0]}" id="section_${id};">
                        <form name="form_firstPokemon_${id}" method="get">
                            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                            <h2 class="card-title">${id}. ${name}</h2>
                            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
                        </form>
                    </section>
                    
                `
                //}
          //  }

        
            const eTypes = types.map(typeInfo => typeInfo.type.name);
            pokemonsList.push({
                id: id,
                name: name,
                src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                types: eTypes.join(' | ')
            })
            
            return accumulator
        }, '')


        const insertPokemonsIntoSession = pokemons => {

            sessionStorage.setItem('pokemonList', JSON.stringify(pokemonsList));
            
            
        }
        const insertPokemonsIntoPage = pokemons => {
             //console.log(pokemons)
             const ul = document.querySelector('[data-js="pokedex"]');
             if (ul != null){
                 //ul.innerHTML = pokemons;
                 //document.getElementById('span_player').innerHTML = name;
                 sessionStorage.setItem('pokemonList', JSON.stringify(pokemonsList));
             }
             
         }
 

        const pokemonPromises = generatePokemonPromises()

        Promise.all(pokemonPromises)
            .then(generateHTML)
            .then(insertPokemonsIntoPage)
            
    }

}
const myController = new Pokedex('#pokedex');
myController.callPokemon();
