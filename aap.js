let item = document.querySelector('#item');
let todobox = document.querySelector('#to-do-box');

const savedata = () => {
    const data = [];
    const li = document.querySelectorAll('p');
    // console.log(li);
    li.forEach((val) => {
        data.push(val.innerText);
    });
    localStorage.setItem("todo", JSON.stringify(data));
}

item.addEventListener('keyup', (e) => {
    // console.log(e.key)
    if(e.target.value!=""){
        if (e.key == "Enter") {
            addToDo(item.value);
            item.value = ""
            savedata()
        }
    }
})

const addToDo = (item) => {

    const todoContainer = document.querySelector('.ul-container');

    todoContainer.innerHTML += ` <div class="todo">
    <p class="para">${item}</p> <button class="edit" onclick="editdata(this)"><i class="fa-solid fa-pen-to-square"></i></button> <button onclick="deletedata(this)" ><i class="remove fa-solid fa-xmark"></i></button> 
   </div>`;
}

const editdata = (currentElement) => {
    if (currentElement.textContent == 'Done') {
        currentElement.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
        let currNewName = currentElement.previousElementSibling.value;
        let para = document.createElement('p');
        para.className = 'para'
        para.innerText = currNewName;
        currentElement.parentElement.replaceChild(para, currentElement.previousElementSibling);

    }
    else {
        currentElement.textContent = "Done";
        const currentInput = document.createElement('input');
        currentInput.className = 'inputval';
        const currname = currentElement.previousElementSibling.innerText;
        currentInput.value = currname;
        currentElement.parentElement.replaceChild(currentInput, currentElement.previousElementSibling)

    }
    savedata()
}
const deletedata = (currentElement) => {
    currentElement.parentElement.remove()
    savedata()
}

(function () {
    const lstodo = JSON.parse(localStorage.getItem("todo"))
    lstodo.forEach((val) => {
        addToDo(val)
        // console.log(val)
    })
})();


