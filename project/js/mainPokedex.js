import Battles from "../js/battles.js";

export default class MainPokedexPage {
    
    constructor(){
        
    }

    chosePokemon() {
        const divMain = document.querySelector('[data-js="pokedex"]');
        const element = JSON.parse(sessionStorage.getItem('pokemonList'));
        
        for (let i = 0; i <= 7; i = i + 3) {
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
            const p = document.createElement("p");
            const div = document.createElement("div");

            const id = element[i].id;
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            div.setAttribute('class', `card ${element[i].types}`);
            div.setAttribute('id', `${id}`);

            img.setAttribute('class', 'card-image');
            img.setAttribute('alt', element[i].name);
            img.setAttribute('src', image);
            

            h2.setAttribute('class', 'card-title');
            h2.innerHTML = `${id} - ${element[i].name}`;

            p.innerHTML = element[i].types;

            const divPokedex = document.querySelector('[data-js="pokedex"]');
            div.appendChild(img);
            div.appendChild(h2);
            div.appendChild(p);
            divPokedex.appendChild(div);

            div.onclick = function () {
                let aux = div;
                while (divPokedex.firstChild) {
                    divPokedex.removeChild(divPokedex.firstChild);
                }
                divPokedex.appendChild(div);
                sessionStorage.setItem('pokemonChosen', this.id);
                sessionStorage.setItem('idImgOriginal', this.id);
                sessionStorage.setItem('mainPokemon', JSON.stringify(element[i]));
                //console.log(this.id);
                window.location.href = "../project/index.html";

            }

        }
    }


    mainPokedex(element, name) {

        const divMain = document.querySelector('[data-js="pokedex"]');
        const namePlayer = document.createElement('h1');
        const playerInformation = JSON.parse(sessionStorage.getItem('pokemonGameSessionVersion'));

        const evolutions = [{id:1, next:2, more: true, 'type': 'medium'},{id:2, next:3, more: false, 'type': 'hard'},
        {id:4, next:5, more: true, 'type': 'medium'},{id:5, next:6, more: false, 'type': 'hard'},{id:7, next:8, more: true, 'type': 'medium'},
        {id:8, next:9, more: false, 'type': 'hard'},{id:10, next:11, more: true, 'type': 'medium'},{id:11, next:12, more: false, 'type': 'hard'}];
        sessionStorage.setItem('evolutionList', JSON.stringify(evolutions));

        namePlayer.innerHTML = name;
        divMain.appendChild(namePlayer);

        const div = document.createElement("div");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const spanExp = document.createElement("span");
        const spanLevel = document.createElement("p");
        const barExp = document.createElement("input");
        const id = element.id;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        const btnBattle = document.createElement("a");
        btnBattle.innerHTML = "Battle";
        btnBattle.addEventListener('click', this.battle);

        div.setAttribute('class', `card ${element.types}`);
        div.setAttribute('id', `${id}`);

        img.setAttribute('class', 'card-image');
        img.setAttribute('alt', element.name);
        img.setAttribute('src', image);
        img.setAttribute('id', `img${id}`);

        barExp.setAttribute('readonly','true');
        spanLevel.setAttribute('id', 'spanLevelPokemon');

        h2.setAttribute('class', 'card-title');
        h2.innerHTML = `${element.name}`;

        //p.innerHTML = element.types;
        playerInformation.forEach(el => {
            if(element.id == el.pokemons){
                spanLevel.innerHTML = `Level: ${el.levels}`;
                barExp.value = `${el.exp}`;
            }
        });
        spanExp.innerHTML = "Exp.";
        
        barExp.setAttribute('id', 'barExp');

        const divPokedex = document.querySelector('[data-js="mainPokedex"]');
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(spanLevel);
        div.appendChild(spanExp);
        div.appendChild(barExp);
        divPokedex.appendChild(btnBattle);
        divPokedex.appendChild(div);

        
    }

    async battle(){
        //pokemon escolhido (pegar o obj pokemon de app.js, meu pokemon e o pokemon sorteado)
        //pegar do meu pokemon o id, lvl e exp
        this.player = new Battles();

        const pokemonChosen = JSON.parse(sessionStorage.getItem('pokemonChosen'));
        const mainPokemon = JSON.parse(sessionStorage.getItem('mainPokemon'));
        const playerInformation = JSON.parse(sessionStorage.getItem('pokemonGameSessionVersion'));

        const divBattle = document.querySelector('[data-js=divBattle]');

        this.player.init(pokemonChosen, mainPokemon, playerInformation, divBattle);

        //const enemyID = this.enemy.randomPokemon();       
       // const enemyPokemon = this.enemy.callPokemon(enemyID);
        //console.log("enemy"+enemyPokemon);


        
        //this.battles.init(mainPokemon, playerInformation, divBattle);

    }

}