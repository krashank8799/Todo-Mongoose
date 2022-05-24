var username = document.getElementById("name");
var inputArea = document.getElementById("listinput");
var saveButton = document.getElementById("savebutton");
var todoList = document.getElementById("alllist");
var logoutButton = document.getElementById("logout");


var localname = localStorage.getItem("name");
var user = JSON.parse(localname);
username.innerHTML = user + "'s Todo List";


logoutButton.addEventListener("click", function() {
    var request = new XMLHttpRequest();
    request.open("GET", "/logout")
    request.send();

    request.addEventListener("load", function() {
        if (request.responseText === 200) {
            localStorage.clear();
        }
        window.location.href = "/";
    })
})


saveButton.addEventListener("click", function(event) {

    if (inputArea.value) {
        var todos = {
            todo: inputArea.value,
            id: Math.floor(Math.random() * 100000),
            complete: false
        }

        var request = new XMLHttpRequest();
        request.open("POST", "/savetodo");
        request.setRequestHeader("Content-type", "application/json");

        request.send(JSON.stringify(todos));

        request.addEventListener("load", function() {
            var list = document.createElement("li");

            var taskName = document.createElement("h3");
            taskName.innerHTML = inputArea.value;

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Remove";

            var checkButton = document.createElement("button");

            var editButton = document.createElement("button");



            list.appendChild(taskName);
            list.appendChild(deleteButton);
            list.appendChild(checkButton);
            list.appendChild(editButton);

            todoList.appendChild(list);


            // deleteButton.addEventListener("click", removeList);
            //checkBox.addEventListener("click", checktask(checkBox));

            // console.log("its working");
            todoList.innerHTML = "";
            inputArea.value = "";


            onLoad();

        })
    }

})

function onLoad() {


    var request = new XMLHttpRequest();
    request.open("GET", "/gettodo");
    request.send();

    request.addEventListener("load", function() {
        var todos = JSON.parse(request.responseText);

        todos.forEach(function(task) {
            var list = document.createElement("li");
            console.log(task.complete);

            var taskName = document.createElement("h2");
            taskName.innerHTML = task.todo;
            taskName.style.color = "brown";

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Remove";

            var checkButton = document.createElement("button");

            var editButton = document.createElement("button");
            editButton.innerHTML = "Edit Task";



            list.appendChild(taskName);
            list.appendChild(deleteButton);
            list.appendChild(checkButton);
            list.appendChild(editButton);

            todoList.appendChild(list);

            list.setAttribute("id", task.id);

            console.log(todos);
            console.log(task);

            deleteButton.addEventListener("click", function(event) {
                var delID = event.target.parentNode.id;
                removeList(delID);
                updateUI(delID);
            });

            if (task.complete) {
                checkButton.innerHTML = "Not Complete";
                taskName.style.textDecoration = "line-through";
            } else {
                checkButton.innerHTML = "Complete";

                taskName.style.textDecoration = "none";

            }

            checkButton.addEventListener("click", function(event) {
                var change = event.target;
                var id = change.parentNode.id;
                var taskName = change.parentNode.children[0];
                if (change.innerHTML == "Completed") {
                    change.innerHTML = 'Not Completed';
                    taskName.style.textDecoration = "line-through";
                } else {
                    change.innerHTML = 'Completed';
                    taskName.style.textDecoration = "none";
                }
                compButtonClicked(id);
            })

            editButton.addEventListener("click", function(event) {
                var editTask = prompt("Edit Your Task");

                if (editTask != null) {
                    var id = event.target.parentNode.id;
                    var editName = event.target.parentNode.children[0];
                    editName.innerHTML = editTask;

                    editedTask(id, editTask);
                }
            })

            inputArea.value = "";
        })
    })

}
onLoad();

function editedTask(id, editName) {
    var request = new XMLHttpRequest();
    request.open("post", "/edit");
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({ id: id, edit: editName }));

    request.addEventListener("load", function() {
        console.log("send")
    })
}

function updatedTodo() {
    // console.log(todos1)
    var request = new XMLHttpRequest();
    request.open('post', '/save');
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(todos1));
    request.addEventListener('load', function() {
        console.log(todos);
    })
}

function removeList(id) {

    var request = new XMLHttpRequest();
    request.open("post", "/remove");
    request.setRequestHeader("Content-type", "application/json");

    request.send(JSON.stringify({ id: id }));


    request.addEventListener("load", function(id) {
        console.log("send", id);
    })
}

function updateUI(delID) {
    var parsedId = JSON.parse(delID);
    var deletelist = document.getElementById(parsedId);
    deletelist.style.display = "none";
    deletelist.innerHTML = "";
}

function compButtonClicked(id) {
    var request = new XMLHttpRequest();
    request.open("post", "/check");
    request.setRequestHeader("Content-type", "application/json");

    request.send(JSON.stringify({ id: id }));


    request.addEventListener("load", function() {
        console.log("send");
    })
}