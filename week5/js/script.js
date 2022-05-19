const btn_add = document.querySelector('#btn_add');
const txt_item = document.querySelector('#txt_item');
const myList = document.querySelector('#myList');
const getTime = Date.now();


btn_add.addEventListener('click', function(){
    const array = JSON.parse(localStorage.getItem('todo')) || [];
    array.push(`${getTime}@${txt_item.value}`);
    localStorage.setItem('todo', JSON.stringify(array));
    txt_item.value = "";
    list();
    
})

function list(){
    if(localStorage.getItem('todo') != null){
        JSON.parse(localStorage.getItem('todo')).forEach(el => {
            let txt = el.split("@");
            let lbl = document.createElement('label');
            lbl.innerHTML = txt[1];
            myList.appendChild(lbl);
        });
    }
    
}

/**
 * 
 * let check = document.createElement('checkbox');
    
    check.setAttribute('id', getTime);
    myList.appendChild(check);
 */