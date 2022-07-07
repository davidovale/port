
import MainLoginJS from "./mainLoginJS.js";
import Pokedex from "../pokedex/app.js";


export default class Controller{
    constructor(name){
        this.name = null;
        this.path = null;
        this.takefirstPokemon = new MainLoginJS();
        this.mainPokemon = new Pokedex();
    }

    async init(controller){
        this.name = takeName();
        
        if (this.name == null){
            this.path = "firstLogin.html";
            insertViewAsync(getViewAsync(this.path), controller);
        }else{
            this.path = "mainLogin.html";
            localStorage.setItem("playerNamePokemon",this.name);
            insertViewAsync(getViewAsync(this.path), controller);
            let chPok = this.takefirstPokemon.checkFirstPokemon();
            if (chPok == false){
                this.path = "./views/vw_first_pokemon.html";
                insertViewAsync(getViewAsync(this.path), controller);
            }else{
                this.path = "./views/vw_my_pokemons.html";
                insertViewAsync(getViewAsync(this.path), controller);
            }
        }        
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

  async function insertViewAsync(viewPromise, controller) {
    const contentElement = document.getElementById('content');
    //debugger;
    contentElement.innerHTML = await viewPromise;
    //controller.init();
  }


function takeName(){
    let query = location.search.slice(1);
    let data = {};
    if (query != ""){
        let parts = query.split('&');
        let test = parts[0].split('=');
        const nickName = test[1].replaceAll('+', ' ');
        return nickName;

    }else{
        return null;
    }
}



