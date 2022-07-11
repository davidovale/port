export default class Items{

    saveItem(key, value){
        sessionStorage.setItem(key, value);
    }
    
    getItem (key, value){
        return sessionStorage.getItem(key, value);
    }

}

