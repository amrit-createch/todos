const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let editingTodo = null; 
const addTodo= () => {
    const todo=input.value.trim();
    if(todo === "") return;
    if(db){
      if (editingTodo) {
      const id = Number(editingTodo.dataset.id);
      editingTodo.querySelector(".todo-text").textContent = todo;
      updateTodoInDB(id, todo);
      editingTodo = null;
    } else {
   const transaction = db.transaction("todotext", "readwrite");
      const store = transaction.objectStore("todotext");
      const todoEntry = { todotext: todo };
      const request = store.add(todoEntry);

      request.onsuccess = (event) => {
        const id = event.target.result;
        console.log("Todo saved to DB with id:", id);
        rendertodo({ id, todotext: todo });
      };

      request.onerror = () => {
        console.log("Error saving todo:", request.error);
      };
    }
  }
  input.value = "";
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
const loadTodosFromDB = () =>{
    const transaction = db.transaction("todotext","readonly")
    const store = transaction.objectStore("todotext")
    const request = store.getAll();
    request.onsuccess=(event)=>{
        const todos = event.target.result;
        todos.forEach(todo => rendertodo(todo))
    }
    request.onerror=()=>{
         console.log("Error loading todos:", request.error);
    }
}
const rendertodo = (todoObj) =>{
    const toDo = document.createElement("div")
    toDo.classList.add("todo")
    toDo.dataset.id = todoObj.id;
    toDo.innerHTML =  `
    <span class="todo-text">${todoObj.todotext}</span>
    <span>
    <input type="checkbox">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      
    </span>
  `;
    const deleteBtn = toDo.querySelector(".delete-btn")
    deleteBtn.addEventListener("click",()=>{
        deleteToDoFromDB(todoObj.id)
        toDo.remove()
    })
    const editBtn = toDo.querySelector(".edit-btn")
        editBtn.addEventListener ("click" , ()=>{
            input.value = toDo.querySelector(".todo-text").textContent
            editingTodo= toDo
        })
        todoList.appendChild(toDo)
    }


    addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});