let db;
const openRequest = indexedDB.open("myDB");
openRequest.addEventListener("success",(e)=>{
    db = openRequest.result
    console.log("DB opened successfully");
    loadTodosFromDB()
})
openRequest.addEventListener("error",(e)=>{
  console.log("Error:", e.target.error);
  
})
openRequest.addEventListener("upgradeneeded",(e)=>{
    db = openRequest.result
     db = e.target.result;

    // Create object store only if it doesn't exist
    if (!db.objectStoreNames.contains("todotext")) {
        db.createObjectStore("todotext", { keyPath: "id", autoIncrement: true });
        console.log("Object store created");
    }
})