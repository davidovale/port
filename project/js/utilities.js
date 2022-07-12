export default class Items{

    saveItem(key, value){
        sessionStorage.setItem(key, value);
    }

    
    
    getItem (key, value=""){
        if (value == ""){
            return sessionStorage.getItem(key);
        }else{

        }
       
    }

}

