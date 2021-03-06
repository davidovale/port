
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
            let btn_first_pokemon = takeName("");
            this.path = "mainLogin.html";
            localStorage.setItem("playerNamePokemon",this.name);
            insertViewAsync(getViewAsync(this.path), controller);
            let chPok = this.takefirstPokemon.checkFirstPokemon();
            if (chPok == false){                
                this.mainPokemon.callPokemon(this.name);
            }else{
                //this.path = "./views/vw_my_pokemons.html";
                //insertViewAsync(getViewAsync(this.path), controller);
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


function takeName(e=""){
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



function test(){
    alert("work");
}