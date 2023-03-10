let input = document.querySelector('.entered-list');
let addBtn = document.querySelector('.add-list');
let tasks = document.querySelector('.tasks');

const todos = JSON.parse(localStorage.getItem('new_do'));
if(todos) {
    todos.forEach(todo => {
        updateTasks(todo)
    });
}

// Adding if already present
function updateTasks(todo)
{
    if (todo) {
        let todoText = todo.text;
        if (todoText!= 0) {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            if(todo.completed) {
                newItem.classList.toggle('completed');
                newItem.innerHTML = `
                <p>${todoText}</p>
                <div class="item-btn">
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-xmark"></i>
                </div>
                `
            }
            else {
                newItem.innerHTML = `
                <p>${todoText}</p>
                <div class="item-btn">
                <i class="fa-regular fa-square-check"></i>
                <i class="fa-solid fa-xmark"></i>
                </div>
                `              
            }
            
            tasks.appendChild(newItem)
            // console.log(newItem);
            input.value = '';
            updateLS();
        }
    }
}



// add btn disabled
input.addEventListener('keyup', ()=>
{
    if(input.value.trim() !=0) {
        addBtn.classList.add('active')
    } else {
        addBtn.classList.remove('active')
    }
});
addTodo();

// // add new task to list
function addTodo() 
{
    addBtn.addEventListener('click', () => {
        if(input.value.trim() !=0) {
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = `
            <p>${input.value}</p>
            <div class="item-btn">
            <i class="fa-regular fa-square-check"></i>
            <i class="fa-solid fa-xmark"></i>
            </div>
            `
            tasks.appendChild(newItem)
            input.value='';
            updateLS();
        }
        else {
            alert('Please enter a task');
        }
        // updateLS();
    });

}
// delete the item from the list

tasks.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-xmark')) {
        e.target.parentElement.parentElement.remove();
        updateLS();
    }
    // updateLS();
});
    
    
// mark item as complete
tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-square-check')) {
        // console.log(e.target)
        if(e.target.classList.contains('fa-regular')) {
            changeIconComp(e.target);
        }
        else if(e.target.classList.contains('fa-solid')) {
            changeIcon(e.target);
        }
        e.target.parentElement.parentElement.classList.toggle('completed');
        updateLS();
    }
});
updateLS();

function updateLS()
{
    const todosEl = document.querySelectorAll('p');
    const todos = [];
    console.log(todos);
    
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.parentElement.classList.contains('completed')
        });
    });
    localStorage.setItem('new_do',JSON.stringify(todos));
}


function changeIconComp(icon) {
    icon.classList.remove("fa-regular");
    icon.classList.toggle("fa-solid")
}
function changeIcon(icon) {
    icon.classList.remove("fa-solid");
    icon.classList.toggle('fa-regular')    
}