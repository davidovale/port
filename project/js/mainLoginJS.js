export default

class MainLoginJS {
    constructor (){
        this.firstPokemon = "";
    }

    async init(){
        
    }

    checkFirstPokemon(){
        if (this.firstPokemon == ""){
            return false;
        }else{
            return true;
        }
    }
    
    addFirstPokemon(e){
        this.firstPokemon = e;
    }
}



