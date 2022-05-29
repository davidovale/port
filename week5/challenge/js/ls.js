import { addItem, getItemsList, callBack } from "./utilities.js";

const btn_add = document.querySelector('#btn_add');
const txtItem = document.querySelector('#txt_item');
const myList = document.querySelector('#myList');
const getTime = new Date();
const divActive = document.getElementsByClassName('divfalse');

let todoList = null;

function addItemList(key, value) {
    const newItem = {
        id: new Date(),
        content: value,
        completed: false
    };

    todoList.push(newItem);
    addItem(key, todoList);
}

function getItems(key){
    if (todoList === null){
        todoList = getItemsList(key) || [];
    }
    return todoList;
}

const mainList = JSON.parse(localStorage.getItem('todo'))
function list(list, element, items){
    let filter = document.getElementById('rd_active').checked;
    element.innerHTML = '';

    let rdAll = document.getElementById('rd_all');
    let rdActive = document.getElementById('rd_active');

    rdAll.addEventListener('click', function(){
        items.showTodoList();
    });

    rdActive.addEventListener('click', function(){
        items.showTodoList();
    });


        list.forEach(el => {
            let div = document.createElement('div');
            div.setAttribute('id', `div${el.id}`);
            if(filter && el.completed){
                div.setAttribute('style', 'display:none');
            }
            
            let chbox = document.createElement('input');
            chbox.setAttribute('type', 'checkbox');
            chbox.setAttribute('id', `ch${el.id}`);
            chbox.setAttribute('class', 'chbox');
            if(chbox){
                chbox.addEventListener('click', function(){
                    console.log(el.id);
                    items.updateItem(el.id);
                })
            }
            let lbl = document.createElement('label');
            lbl.setAttribute('id',`txt${el.id}`);
            lbl.innerHTML = el.content;
            let completed = document.createElement('button');
            completed.setAttribute('id',`btn${el.id}`);
            completed.setAttribute('value', 'X');
            completed.setAttribute('class', 'btnCompleted');
            completed.innerHTML = 'X';
            if(completed){
                completed.addEventListener('click', function(){
                    items.deleteItem(el.id);
                });
            }

            

            div.appendChild(chbox);
            div.appendChild(lbl);
            div.appendChild(completed);
            myList.appendChild(div);
        });
    checkBox();
}

function checkBox(){
    todoList.forEach(el => {
        if (el.completed == true){
            document.getElementById(`ch${el.id}`).checked = "true";
            document.getElementById(`ch${el.id}`).disabled = "true";
        }else{
            document.getElementById(`ch${el.id}`).disabled = "";
        }
    })

}

export default class Todos{

    constructor(list, key){
        this.list = list;
        this.key = key;
        console.log(this.list);
        console.log(this.key);
        callBack("#btn_add", this.newItem.bind(this));
        this.showTodoList();
    }

    findItem(id) {
        let todo = todoList.find(el => {
            return el.id === id;
        });
        return todo;
    }

    newItem(){
        addItemList(this.key, txtItem.value);
        txtItem.value = "";
        this.showTodoList();
    }

    showTodoList(){
        list(getItems(this.key), this.list, this);
        this.checkClass();
    }

    deleteItem(id){
        let todo = this.findItem(id);
        if (todo){
            let newArray = todoList.filter((item)=>item.id != todo.id);
            addItem(this.key, newArray);
        } 
            location.reload();
    }

    updateItem(id){
        let todo = this.findItem(id);
        if (todo) {
            todo.completed = !todo.completed;
            addItem(this.key, todoList);
            list(todoList, this.list, this);
        }
        this.checkClass();
    }

    checkClass(){
        todoList.forEach(el => {
            if (el.completed == true){
                document.getElementById(`txt${el.id}`).classList.toggle("disabled");
    
            }else{
                document.getElementById(`txt${el.id}`).classList.toggle("enabled");
    
            }
        })
    }
    
}