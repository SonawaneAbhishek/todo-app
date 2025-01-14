const form = document.querySelector(".form");
const inputTodo = document.querySelector(".inputTodo");
const ul = document.querySelector(".allTodos");

render();


form.addEventListener("submit" , (e) => {
    e.preventDefault();
    const getTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    
    let text =inputTodo.value.trim();
    if (!text){
        alert("Todo cannot be empty");
        return;
    }

    let todoId = crypto.randomUUID();
    let completed = false;
    
    const newTodo = {
        id : todoId,
        todo : text,
        completed:completed
    }

    getTodos.push(newTodo);

    localStorage.setItem("todos" , JSON.stringify(getTodos));
    inputTodo.value = "";

    render();
})

function render(){
    const getAllTodos = JSON.parse(localStorage.getItem("todos")) ?? [];

    const newLi = getAllTodos.map((i) => {
        return `<li data-id=${i.id} class="${i.completed ? "completed" : ""}">${i.todo}
                <div class="buttons">
                    <button ><img class="done" src="./images/accept.webp"></button>
                    <button ><img class="remove" src="./images/shape.webp" ></button>
                </div>
            </li>`
    }).join("");

    ul.innerHTML = newLi;  
}

ul.addEventListener("click", (e) => {
    e.preventDefault();  

    let target = e.target;
    
    if(target.classList.contains("done")){

        let doneId = target.closest("li").dataset.id;
        const doneTodos = JSON.parse(localStorage.getItem("todos"));
        let foundDone = doneTodos.find((i) => i.id == doneId);
        foundDone.completed = !foundDone.completed;// reassigning or updating value which will eventually reflect in original array

        localStorage.setItem("todos",JSON.stringify(doneTodos));
        render();

    };

    if(target.classList.contains("remove")){
        let remId = target.closest("li").dataset.id;

        const todosForFilter = JSON.parse(localStorage.getItem("todos"));

        const filteredTodos = todosForFilter.filter((i) => {
            return i.id != remId ; 
        })

        localStorage.setItem("todos",JSON.stringify(filteredTodos));
        render();

    }
})




