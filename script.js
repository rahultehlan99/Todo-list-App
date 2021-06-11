const todoform  = document.querySelector('.todo-form');

const todoinput = document.querySelector('.todo-input');

const todoitemslist = document.querySelector('.todo-items');

const remitems = document.querySelector('.items-rem');

let todos =  [];

/*
const todo = {
    id:Date.now(),
    name:"task"
    conpleted:true/false
}
*/


todoform.addEventListener("submit",function(e){

    e.preventDefault();
    addTodo(todoinput.value);

});


function addTodo(item){

    if(item!=""){

        const todo = {
            id:Date.now(),
            name:item,
            completed:false
        };

        todos.push(todo);

        addtolocalstorage(todos);

        todoinput.value='';
    }
}

function rendertodos(todos){

    todoitemslist.innerHTML='';

    remitems.innerHTML = `Remaining todos count: ${todos.length}`;

    todos.forEach(function(item){

        const li = document.createElement('li');

        const checked = item.completed?"checked":null;

        li.setAttribute('class','item');
        li.setAttribute('data-key',item.id);

        if(item.completed===true){
            li.classList.add("checked");
        }

        li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>
        <p>${item.name}</p>
        <button class="delete-button">X</button>`;

        todoitemslist.append(li);

    });

}

function addtolocalstorage(todos){

    localStorage.setItem('todos',JSON.stringify(todos));

    rendertodos(todos);
}

function getfromlocalstorage(){

    const reference = localStorage.getItem('todos');

    if(reference){
        todos = JSON.parse(reference);
        rendertodos(todos);
    }

}

function toggle(id){

    todos.forEach(function(item){

        if(item.id==id){
            item.completed=!item.completed;
        }
    });

    addtolocalstorage(todos);
}

function deletetodo(id){  // function to delete a todo

    for(let i=0;i<todos.length;i++)
    {
        if(todos[id]==id)
        {
            todos.splice(i,1);
            break;
        }
    }

    addtolocalstorage(todos);  // update to local storage
}

getfromlocalstorage();

todoitemslist.addEventListener('click',function(e){

    if(e.target.type=="checkbox"){
        toggle(e.target.parentElement.getAttribute("data-key"));
    }

    if(e.target.classList.contains("delete-button")){
        
        deletetodo(e.target.parentElement.getAttribute('data-set'));

    }
});


