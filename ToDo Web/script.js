const inputBox = document.querySelector(".input-field input");
const addBtn = document.querySelector(".input-field button");
const todoList = document.querySelector(".todo-list");
const pendingList = document.querySelector(".pending-items")
const deleteAllbtn = document.querySelector(".footer button")

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if(userData.trim() != 0){
        addBtn.classList.add("active")
    }else{
        addBtn.classList.remove("active")
    }
}

showTasks();

addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");

    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData)
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove("active")
}

//add task in list
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");

    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }

    //Counting the tasks that are in list
    pendingList.textContent = listArr.length;

    //deleteAllbtn active or inactive
    if(listArr.length > 0){
        deleteAllbtn.classList.add("active");
    }else{
        deleteAllbtn.classList.remove("active")
    }

    let newLiTag ='';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTasks(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value =""; 
}

//delete task
function deleteTasks(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);

    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

//function to delete all task
deleteAllbtn.onclick = ()=>{
    listArr = []

    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}
