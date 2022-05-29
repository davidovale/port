export function addItem(key, el){
    //const position = mainList.indexOf(el);
    //mainList.splice(position, 1);
    localStorage.setItem(key, JSON.stringify(el));
    //list();
}

export function getItemsList(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function callBack(item, callback) {
    const el = document.querySelector(item);
    el.addEventListener("click", callback);
}