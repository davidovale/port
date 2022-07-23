import Pokedex from "../pokedex/app.js";


export default class Battles{

    constructor(){
        
        

    }

    init(pokemonChosen, mainPokemon, playerInformation, divBattle){
        this.pokemon = new Pokedex();
        const fullList = JSON.parse(sessionStorage.getItem('pokemonList'));
        const listPokemon = this.pokemon.init();
        const [level, exp] = checkLevel(pokemonChosen);
        const type = levelManagemment(level);
        const [enemy, myPokemon] = this.setPokemons(level, type, listPokemon, fullList, mainPokemon);
        this.typeEnemy = '';
        
        while (divBattle.firstChild) {
            divBattle.removeChild(divBattle.firstChild);
          }
        divBattle.appendChild(enemy);
        divBattle.appendChild(myPokemon);

        let finish = false;
        
    }

    setPokemons(level, type, list, fullList, mainPokemon){
        let aux, aux2 = '';
        list.forEach(element => {
            if(element.type == type){
               aux =  randomPokemon(element.id);
            }
        });

        fullList.forEach(element => {
            //enemy
            if(element.id == aux){
                this.typeEnemy = element.types.split(' | ')[0];
                aux = setDivPokemon(element, type, level, element.types.split(' | ')[0]);
                
            }
        });

        fullList.forEach(element => {
            //player
            if(element.id == mainPokemon.id){
                aux2 = setDivPokemon(element, type, level, element.types.split(' | ')[0], this.typeEnemy, true);
            }
        });

        return [aux, aux2];
    }

    update_skills(){

    }

}

function randomPokemon(number){
    return number[Math.floor(Math.random() * number.length)];
}

function randomLife(type){
    
    const number = lifeTable(type);
    //let value =  Math.floor(Math.random() * (number - (number * 0.1) + 1)) + (number * 0.9);
    const max = number * 1.05;
    const min = number - (number * 0.05);
    let value =  Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

function lifeTable(type){
    let number = '';
    if(type == 'easy'){
        number = 500;
    }else if(type == 'medium'){
        number = 1500;
    }else if(type == 'hard'){
        number = 3000;
    }
    return number;
}


function checkLevel(pokemon){
    const aux = selectPokemon(pokemon);
    const level = aux[0];
    const exp = aux[1];
    return [level, exp];
}

function selectPokemon(id){
    const pokemon = JSON.parse(sessionStorage.getItem('pokemonGameSessionVersion'));
    let aux = '';
    pokemon.forEach(element => {
        if(parseInt(element.pokemons) == id){
            aux = [element.levels, element.exp]
        }
    });
    return aux;
}

function levelManagemment(level){
    if(level == 1){
        return 'easy';
    }else if(level == 2){
        return 'medium';
    }else{
        return 'hard';
    }
}

function setDivPokemon(element, type, level, types, typeEnemy='', player=''){
    const session = document.createElement('session');
    const span = document.createElement('span');
    const img = document.createElement('img');
    const life = document.createElement('input');
    const btnAttack = document.createElement('button');
    btnAttack.textContent = 'Attack';
    const firstAttack = Math.floor(Math.random() * 2 + 1);
    const sortLevelEnemy = Math.floor(Math.random() * 1+1);
    let expGained = '';
    

    btnAttack.addEventListener('click', function () {
        let end = false;
        let lifePlayer = document.querySelector('#lifePlayer');
        let lifeEnemy = document.querySelector('#lifeEnemy');
        let color = setColor(types);
        let colorEnemy = setColor(typeEnemy);
        
        img.style.backgroundColor = color;
        setTimeout(() => {
            img.style.backgroundColor = '#fff';
        }, "1000");

        if(expGained == ''){
            expGained = lifeEnemy.value;
        }
        
        if(firstAttack == 1){
            lifeEnemy.value -= Math.floor(Math.random() * (20 * level) + 20);
            lifePlayer.value -= Math.floor(Math.random() * (20 * level) + 20);
        }else{
            lifePlayer.value -= Math.floor(Math.random() * (20 * level) + 20);
            lifeEnemy.value -= Math.floor(Math.random() * (20 * level) + 20);
        } 

        
        if (lifeEnemy.value <= 0) {
            lifeEnemy.value = 0;
            sessionStorage.setItem('battleWinner', 'player');
            document.querySelector('#sessionEnemy').style.display = "none";
            document.querySelector('#lifePlayer').style.display = "none";
            document.querySelector('#spanPlayer').textContent = 'You Win!!!';
            expGained = Math.round(expGained * 0.2);
            btnAttack.style.display = 'none';
            callBack(element.id, expGained, type);
        } else {
            let imgEnemy = document.querySelector(`#enemy${typeEnemy}`);
            imgEnemy.style.backgroundColor = colorEnemy;
            setTimeout(() => {
                imgEnemy.style.backgroundColor = '#fff';
            }, "1200");

            if (lifePlayer.value <= 0) {
                lifePlayer.value = 0;
                sessionStorage.setItem('battleWinner', 'enemy');
                document.querySelector('#sessionPlayer').style.display = "none";
                document.querySelector('#lifeEnemy').style.display = "none";
                document.querySelector('#spanEnemy').textContent = 'You Lose!!!';
                expGained = Math.round(expGained * 0.05);
                btnAttack.style.display = 'none';
                callBack(element.id, expGained, type);
            }
            
        }
        
        
    })

    let pokeLife = '';

    if(player == true){
        pokeLife = lifeTable(type) + (Math.round(level * 10));
        session.setAttribute('id','sessionPlayer');
        life.setAttribute('id','lifePlayer');
        session.appendChild(btnAttack);
        span.setAttribute('id','spanPlayer');
        img.setAttribute('id', element.name);

    }else{
        pokeLife = randomLife(type) + (Math.round(level * 10));
        session.setAttribute('id','sessionEnemy');
        life.setAttribute('id','lifeEnemy');
        span.setAttribute('id','spanEnemy');
        img.setAttribute('id', `enemy${types}`);
    }

    life.value = pokeLife;
    life.setAttribute('readonly','true');
    life.setAttribute('class', 'inputLikePokemon');

    span.innerHTML = element.name;
    img.setAttribute('src', element.src);
    img.setAttribute('alt', element.name);
    
    img.setAttribute('class', 'card-image');

    session.appendChild(life);
    session.appendChild(span);
    session.appendChild(img);
    return session;
}


function setColor(type){
    if(type == 'fire'){
        return '#FF0000';
    }else if(type == 'water'){
        return '#00BFFF';
    }else if(type == 'grass'){
        return '#32CD32';
    }else if(type == 'flying'){
        return '#87CEFA';
    }else if(type == 'fighting'){
        return '#A0522D';
    }else if(type == 'poison'){
        return '#F08080';
    }else if(type == 'electric'){
        return '#DAA520';
    }else if(type == 'ground'){
        return '#F4A460';
    }else if(type == 'rock'){
        return '#8B4513';
    }else if(type == 'psychic'){
        return '#DEB887';
    }else if(type == 'ice'){
        return '#F5F5F5';
    }else if(type == 'bug'){
        return '#F0FFF0';
    }else if(type == 'ghost'){
        return '#C0C0C0';
    }else if(type == 'steel'){
        return '#D8BFD8';
    }else if(type == 'dragon'){
        return '#FFE4C4';
    }else if(type == 'dark'){
        return '#708090';
    }else if(type == 'fairy'){
        return '#FF69B4';
    }else{
        return '#fff';
    }
}

function callBack(id, exp, type) {
    const player = JSON.parse(sessionStorage.getItem('pokemonGameSessionVersion'));
    const barExp = document.querySelector('#barExp');
    const spanLevel = document.querySelector('#spanLevelPokemon');
    player.forEach(e => {
        if (e.pokemons == id) {
            checkEvolution(player, id, type);
            e.exp[0] += exp;
            e.levels[0] = checkNumberLevel(e.exp)
            barExp.value = e.exp;
            spanLevel.innerHTML = `Level: ${e.levels[0]}`;
        }
    })
    sessionStorage.setItem('pokemonGameSessionVersion', JSON.stringify(player));
}

function checkNumberLevel(exp){
    if(exp < 100){
        return 1;
    }else if(exp < 200){
        return 2;
    }else if(exp < 300){
        return 3;
    }else if(exp < 400){
        return 4;
    }else if(exp < 500){
        return 5;
    }else if(exp < 600){
        return 6;
    }else if(exp < 900){
        return 7;
    }else if(exp < 1200){
        return 8;
    }else if(exp < 1500){
        return 9;
    }else if(exp < 1800){
        return 10;
    }else if(exp < 2500){
        return 11;
    }else if(exp < 3000){
        return 12;
    }else if(exp < 3500){
        return 13;
    }else if(exp < 4000){
        return 14;
    }else{
        return 15
    }
}

function checkEvolution(player, id, type){
    const evolutions = JSON.parse(sessionStorage.getItem('evolutionList'));
    const pokemonChosen = JSON.parse(sessionStorage.getItem('pokemonChosen'));
    const pokemonList = JSON.parse(sessionStorage.getItem('pokemonList'));
    const mainPokemon = JSON.parse(sessionStorage.getItem('mainPokemon'));
    
    let auxNext = '';
    evolutions.forEach(e => {
        if(e.id == id && e.type == type){
            player.forEach(el => {
                if(el.pokemons == id){
                    el.pokemons[0] = e.next;
                    auxNext = e.next;
                    
                }
            });
            sessionStorage.setItem('pokemonGameSessionVersion', JSON.stringify(player));
            sessionStorage.setItem('pokemonChosen', e.next);
            const img = document.querySelector(`#img${JSON.parse(sessionStorage.getItem('idImgOriginal'))}`);

            
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.next}.png`;
            //img.setAttribute('id',e.next);
            pokemonList.forEach(element => {
                if(element.id == auxNext){
                    mainPokemon.id = auxNext;
                    mainPokemon.name = element.name;
                    document.querySelector('#spanNameMainPokemon').textContent =element.name;
                    mainPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${auxNext}.png`;
                    const auxMain = mainPokemon;
                    sessionStorage.setItem('mainPokemon', JSON.stringify(auxMain));
                    //document.querySelector('#squirtle').src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png';
                }
            })   
        }

        
    });


}