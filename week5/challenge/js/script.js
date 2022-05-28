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
            let txt = el.split("@");
            //myList.appendChild(lbl);
            let chbox = document.createElement('input');
            chbox.setAttribute('type', 'checkbox');
            chbox.setAttribute('id', `ch${txt[0]}`);
            chbox.setAttribute('class', 'chbox');
            chbox.setAttribute('onclick', `completed('${txt[0]}')`);
            let lbl = document.createElement('label');
            lbl.setAttribute('id',`txt${txt[0]}`);
            lbl.innerHTML = txt[1];
            let completed = document.createElement('button');
            completed.setAttribute('id',`btn${txt[0]}`);
            completed.setAttribute('value', 'X');
            completed.setAttribute('class', 'btnCompleted');
            completed.innerHTML = 'X';

            myList.appendChild(chbox);
            myList.appendChild(lbl);
            myList.appendChild(completed);
        });
    }
    
}

function completed(check){
    let auxList = JSON.parse(localStorage.getItem('todo')).forEach(el => {
        let txt = el.split("@");
        if (txt[0] == check){
            txt[2] = 'true';
        }
        
    });
    //localStorage.setItem('todo', JSON.stringify(array));
    //document.getElementById(check).checked = true;
}




/**
 * 
 * let check = document.createElement('checkbox');
    
    check.setAttribute('id', getTime);
    myList.appendChild(check);
 */