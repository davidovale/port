
import Items from "./utilities.js";

export default class MainLoginJS {
    constructor (){
        this.firstPokemon = "";
        this.items = new Items();
        this.account = "";

    }

    async init(){
        checkFirstPokemon(this.account, this.items);
    }

    
    
    addFirstPokemon(e){
        this.firstPokemon = e;
    }
}

function checkFirstPokemon(account, items){
    account = items.getItem("playerNamePokemon");
    alert(this.account);
    if (this.firstPokemon == ""){
        return false;
    }else{
        return true;
    }
}




