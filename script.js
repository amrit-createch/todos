const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let editingTodo = null; 
const addTodo= () => {
    const todo=input.value.trim();
    if(todo === "") return;
    
    if(editingTodo){
        editingTodo.querySelector(".todo-text").textContent = todo
        editingTodo=null;
        
    } else {
    const toDo= document.createElement("div")
    toDo.classList.add("todo")
    toDo.innerHTML = `<span class="todo-text">${todo}</span>
        <span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </span>`;


        const deleteBtn = toDo.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", () => {
        toDo.remove();
        });

    const editBtn = toDo.querySelector(".edit-btn")
    editBtn.addEventListener("click",() => {
       input.value = toDo.querySelector(".todo-text").textContent
       editingTodo = toDo

    })
    todoList.appendChild(toDo)
}
   input.value=""
    }
    addBtn.addEventListener("click", addTodo);


