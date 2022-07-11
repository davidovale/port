
import MainLoginJS from "./mainLoginJS.js";
import Pokedex from "../pokedex/app.js";
import Items from "./utilities.js";


export default class Controller{
    constructor(name){
        this.name = null;
        this.path = null;
        this.takefirstPokemon = new MainLoginJS();
        this.mainPokemon = new Pokedex();
        this.item = new Items();
        this.item.saveItem("playerNamePokemon", "");
    }

    async init(controller){
        
        this.name = takeName();
        
       let value = checkPlayer(this.name);
       this.item.saveItem(this.name, value);
        
        if (this.name == null){
            this.path = "firstLogin.html";
            insertViewAsync(getViewAsync(this.path), controller);
        }else{
            //let btn_first_pokemon = takeName("");
            this.path = "mainLogin.html";
            this.item.saveItem("playerNamePokemon", this.name);


            //localStorage.setItem("playerNamePokemon",this.name);
            //insertViewAsync(getViewAsync(this.path), controller);
            window.location.href = "../project/mainLogin.html";
            
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

function checkPlayer(nameP){
    let rollPlayer = JSON.parse(localStorage.getItem(nameP) || '[]');

    if (rollPlayer == ""){
        rollPlayer.push({
            name: nameP,
            firstPokemon: "",
            pokemons:"",
            levels:""
        })
       return JSON.stringify(rollPlayer);
    }

}