import Pokedex from "../pokedex/app.js";
import Items from "./utilities.js";
import MainPokedexPage from "./mainPokedex.js";

export default class Controller{
    constructor(name){
        this.name = null;
        this.key = 'pokemonGameSessionVersion';
        this.path = null;
  //      this.takefirstPokemon = new MainLoginJS();
        this.mainPokemon = new Pokedex();
        this.item = new Items();
        this.pokedexPage = new MainPokedexPage();
        //this.item.saveItem("playerNamePokemon", "");
        this.account = "";
    }

    async init(controller) {

        this.name = takeName();
        if (this.name == null){
            //let value = checkPlayer(this.name);
            //this.item.saveItem(this.name, value);
            this.item.saveItem('playerNamePokemon', '');
        }

        const pName = this.item.getItem('playerNamePokemon');
        if (this.name == null && (pName =='' || pName == null || pName == 'null')) {
            this.path = "firstLogin.html";
            insertViewAsync(getViewAsync(this.path), controller);
        } else if (pName == null || pName == 'null' || pName == ''){
            this.item.saveItem("playerNamePokemon", this.name);
            
            this.item.saveItem(this.key,checkPlayer(this.name));
            document.getElementById("span_player").innerHTML = this.name;
            this.account = JSON.parse(this.item.getItem(this.name));
            const firstP = JSON.parse(sessionStorage.getItem('pokemonChosen') || '[]');

            if (firstP == ''){
                this.pokedexPage.chosePokemon();
            }else{
                
            }


           // if(checkFirstPokemon(this.account)){

           // }else{
                this.mainPokemon.callPokemon();
            //}                       
            //window.location.href = "../project/mainLogin.html";
            //console.log(this.account[0].name);
        } else {
            this.path = 'mainPokedexPage.html';
            this.startGame(this.path, controller);
            
        }
    }

    startGame(path, controller){
        addFirstPokemonInfo(this.key, this.item);
        const mainPokemon = sessionStorage.getItem('pokemonChosen');
        const mainInfo = this.mainPokemon.callPokemon(mainPokemon, false);
        //console.log(mainPokeInfo);
       // let accumulator = `
       // <h1>${this.name}</h1>
       // <img class='card-image' alt='charmander' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mainPokemon}.png'>
       // `;
       const mainPokeInfo = JSON.parse(this.item.getItem('mainPokemon'));
       this.pokedexPage.mainPokedex(mainPokeInfo, this.name);
        getViewAsync(path)
        //mainView(accumulator, controller);
        
        
    }
    
}

async function getViewAsync(viewPath) {
    try {
      const response = await fetch(viewPath);
      const text = await response.text();
  
      return text;
    } catch (err) {
      console.log('Something went wrong', err);
    }
  }

  async function mainView(viewPromise, controller) {
    const contentElement = document.getElementById('main-game');
    //debugger;
    contentElement.innerHTML = await viewPromise;
    //controller.init();
  }

  async function insertViewAsync(viewPromise, controller) {
    const contentElement = document.getElementById('content');
    //debugger;
    contentElement.innerHTML = await viewPromise;
    //controller.init();
  }


function takeName(e=""){
    let query = location.search.slice(1);
    let data = {};
    if (query != ""){
        let parts = query.split('&');
        let test = parts[0].split('=');
        const nickName = test[1].replaceAll('+', ' ');
        
        return nickName;

    }else{
        if(sessionStorage.getItem('playerNamePokemon') != ''){
            return sessionStorage.getItem('playerNamePokemon')
        }else{
            return null;
        }
        
    }
}

function checkPlayer(nameP){
    let rollPlayer = JSON.parse(localStorage.getItem(nameP) || '[]');

    if (rollPlayer == ""){
        rollPlayer.push({
            name: nameP,
            firstPokemon: "",
            pokemons: [],
            levels:[],
            exp: []
        })
       
 //   }else{
   //     rollPlayer = JSON.parse(localStorage.getItem('playerNamePokemon'));
    }
   // console.log(JSON.stringify(rollPlayer));
    return JSON.stringify(rollPlayer);
}

function addFirstPokemonInfo(key, item){
    let mainPokedex = JSON.parse(item.getItem(key));
    //console.log(mainPokedex);
    if(mainPokedex[0].firstPokemon == ''){
        mainPokedex[0].firstPokemon = sessionStorage.getItem('pokemonChosen');
        mainPokedex[0].pokemons.push(sessionStorage.getItem('pokemonChosen'));
        mainPokedex[0].levels.push(1);
        mainPokedex[0].exp.push(1);
        const aux = JSON.stringify(mainPokedex);
        item.saveItem(key, aux);
    }
    
}

const myController = new Pokedex('#pokedex');
myController.callPokemon();