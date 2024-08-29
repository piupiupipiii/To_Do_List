const inputBox = document.getElementById("input-box");
const uncheckedList = document.getElementById("unchecked-list");
const checkedList = document.getElementById("checked-list");
const checkedCount = document.getElementById("checked-count");

function addTask() {
    if (inputBox.value === '') {
        alert("Ayo tulis sesuatu");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        let span = document.createElement("span");
        span.innerHTML = "\u00D7"; 
        span.addEventListener("click", function(e) {
            e.stopPropagation(); 
            li.remove();
            saveData();
            updateCheckedCount();
        });
        
        li.appendChild(span);
        uncheckedList.appendChild(li);
        li.addEventListener("click", toggleChecked);
        saveData();
    }
    inputBox.value = "";
}

function saveData() {
    localStorage.setItem("unchecked-list", uncheckedList.innerHTML);
    localStorage.setItem("checked-list", checkedList.innerHTML);
}

function showTask() {
    uncheckedList.innerHTML = localStorage.getItem("unchecked-list");
    checkedList.innerHTML = localStorage.getItem("checked-list");
    
    uncheckedList.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", toggleChecked);
        li.querySelector("span").addEventListener("click", function(e) {
            e.stopPropagation();
            li.remove();
            saveData();
            updateCheckedCount();
        });
    });

    checkedList.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", toggleChecked);
        li.querySelector("span").addEventListener("click", function(e) {
            e.stopPropagation();
            li.remove();
            saveData();
            updateCheckedCount();
        });
    });

    updateCheckedCount();
}

function toggleChecked() {
    this.classList.toggle("checked");
    if (this.classList.contains("checked")) {
        checkedList.appendChild(this);
    } else {
        uncheckedList.appendChild(this);
    }
    saveData();
    updateCheckedCount();
}

function updateCheckedCount() {
    var count = checkedList.children.length;
    if (count === 0) {
        checkedCount.innerText = '';
    } else {
        var pluralize = count !== 1 ? 's' : '';
        checkedCount.innerText = count + ' item' + pluralize + ' in check';
    }
}

showTask();
