const btn_add = document.querySelector('#btn_add');
const txt_item = document.querySelector('#txt_item');
const myList = document.querySelector('#myList');
const getTime = Date.now();

btn_add.addEventListener('click', function(){
    const array = JSON.parse(localStorage.getItem('todo')) || [];
    array.push(`${getTime}@${txt_item.value}@false`);
    localStorage.setItem('todo', JSON.stringify(array));
    txt_item.value = "";
    list();
    
})

function list(){
    myList.innerHTML = '';
    if(localStorage.getItem('todo') != null){

        JSON.parse(localStorage.getItem('todo')).forEach(el => {
            let div = document.createElement('div');
            div.setAttribute('id', `div${el}`);
            let txt = el.split("@");
            //myList.appendChild(lbl);
            let chbox = document.createElement('input');
            chbox.setAttribute('type', 'checkbox');
            chbox.setAttribute('id', `ch${txt[0]}`);
            chbox.setAttribute('class', 'chbox');
            chbox.setAttribute('onclick', `updateItem('${el}')`);
            let lbl = document.createElement('label');
            lbl.setAttribute('id',`txt${txt[0]}`);
            lbl.innerHTML = txt[1];
            let completed = document.createElement('button');
            completed.setAttribute('id',`btn${txt[0]}`);
            completed.setAttribute('value', 'X');
            completed.setAttribute('class', 'btnCompleted');
            completed.setAttribute('onclick', `removeItem('${el}')`);
            completed.innerHTML = 'X';

            div.appendChild(chbox);
            div.appendChild(lbl);
            div.appendChild(completed);
            myList.appendChild(div);
        });
    }
    checkBox();
}

function completed(check){
    //let auxList = JSON.parse(localStorage.getItem('todo')).forEach(el => {
        
    txt = check.split("@");
    let ch = document.getElementById(`ch${txt[0]}`).disabled = "true";
    if (txt[2] == 'false'){
        txt[2] = 'true';
    }
    return (`${txt[0]}@${txt[1]}@${txt[2]}`);    
    //})
   //console.log(check);
}

function updateItem(el){
    todo = JSON.parse(localStorage.getItem("todo"));
    const position = todo.indexOf(el);
    const value = completed(todo[position]);
    todo[position] = value;
    localStorage.setItem('todo', JSON.stringify(todo));
    location.reload();
}


function removeItem(el){
    todo = JSON.parse(localStorage.getItem("todo"));
    const position = todo.indexOf(el);
    todo.splice(position, 1);
    localStorage.setItem('todo', JSON.stringify(todo));
    list();
}

function checkClass(){
    let auxList = JSON.parse(localStorage.getItem('todo')).forEach(el => {
        aux = el.split("@");
        if (aux[2] == "true"){
            document.getElementById(`txt${aux[0]}`).classList.toggle("disabled");

        }else{
            document.getElementById(`txt${aux[0]}`).classList.toggle("enabled");

        }
    })
}

function checkBox(){
    let auxList = JSON.parse(localStorage.getItem('todo')).forEach(el => {
        aux = el.split("@");
        if (aux[2] == "true"){
            document.getElementById(`ch${aux[0]}`).checked = "true";
            document.getElementById(`ch${aux[0]}`).disabled = "true";
        }else{
            document.getElementById(`ch${aux[0]}`).disabled = "";
        }
    })
    checkClass();
}
