
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let editingTodo = null; 
const addTodo= () => {
    const todo=input.value.trim();
    if(todo === "") return;
    if(db){
        let transaction = db.transaction("todotext","readwrite");
        let store = transaction.objectStore("todotext")
        let todoEntry = { todotext: todo };
        let request = store.add(todoEntry)
          request.onsuccess = (event) => {
            const id = event.target.result; // DB-generated id
            console.log("Todo saved to DB with id:", id);

    if(editingTodo){
        editingTodo.querySelector(".todo-text").textContent = todo
        editingTodo.dataset.id = id
         updateTodoInDB(id, todo);
        editingTodo=null;
        
    } else {
    const toDo= document.createElement("div")
    toDo.classList.add("todo")
    toDo.dataset.id = id;
    toDo.innerHTML = `<span class="todo-text">${todo}</span>
        <span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </span>`;


        const deleteBtn = toDo.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", () => {
            deleteToDoFromDB(id)
        toDo.remove();
        });

    const editBtn = toDo.querySelector(".edit-btn")
    editBtn.addEventListener("click",() => {
       input.value = toDo.querySelector(".todo-text").textContent
       editingTodo = toDo

    })
    todoList.appendChild(toDo)
}
          };
          
        request.onerror = () => {
            console.log("Error saving todo:", request.error);
        };
    }
   input.value=""
}
const deleteToDoFromDB = (id) => {
    const transaction = db.transaction("todotext","readwrite")
    const store = transaction.objectStore("todotext")
    const request = store.delete(id)
     request.onsuccess = () => {
        console.log("Todo deleted from DB:", id);
    };

    request.onerror = () => {
        console.log("Error deleting todo:", request.error);
    };
}
const updateTodoInDB = (id,newText) =>{
    const transaction = db.transaction("todotext","readwrite");
    const store = transaction.objectStore("todotext")
    const request = store.put({id,todotext:newText})
        request.onsuccess = () => {
        console.log("Todo updated in DB:", id, newText);
    };

    request.onerror = () => {
        console.log("Error updating todo:", request.error);
    };
}


    addBtn.addEventListener("click", addTodo);

