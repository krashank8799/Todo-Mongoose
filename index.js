const db = require("./database/index");
const userModel = require("./database/models/user");
const todoModel = require("./database/models/todo");

db.start();



/*const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://Krashank:k12345678@cluster0.7moxc.mongodb.net/todoDb?retryWrites=true&w=majority"
const client = new MongoClient(url);

const dbName = 'myTodoList';
var dbInstance = null;

client.connect().then(function()
{
  console.log("Database is working")
  dbInstance = client.db(dbName);
})*/

const express = require('express')
const app = express()
const port = 3000;
//const fs = require("fs")

var session = require('express-session');

app.use(express.static("client"))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
}))

app.get("/", function(req, res) {
    if (req.session.isLoggedIn) {
        console.log(req.session.username);
        console.log(req.session.useremail);


        res.redirect("/welcome.html")

    } else
        res.redirect("/login.html")
})

app.post("/signup", function(req, res) {
    var user = req.body;

    writeUser(user, function() {
        res.status(200);
        console.log(user);
        res.redirect("/login.html")
        console.log("Details saved")
    })

})

app.post("/userlogin", function(req, res) {
    var newEmail = req.body.loginID;
    var newPassword = req.body.loginPassword;

    readUserLogin(newEmail, newPassword, function(user) {
        if (user) {
            req.session.isLoggedIn = true;
            req.session.username = user.username;
            req.session.useremail = user.email;
            req.session.userId = user._id;

            res.status(200);
            res.end(req.session.username);

            console.log("login success")
        } else {
            res.status(404);
            res.end("Login Error")
            console.log("login error")
        }
    })
})

app.get("/logout", function(req, res) {
    res.redirect("/login.html");
    req.session.destroy();
})

app.post("/savetodo", function(req, res) {
    var todos = {
        todo: req.body.todo,
        complete: req.body.complete,
        id: req.body.id,
        createdBy: req.session.userId
    };

    saveUserTodos(todos, function() {
        res.status(200);
        console.log("Todos saved successfully");
        res.end("Todos Saved")
    })
})

app.get("/gettodo", function(req, res) {
    var userId = req.session.userId;

    getUserTodos(userId, function(todos) {
        res.json(todos);
    })
})

app.post("/remove", function(req, res) {
    var userId = req.session.userId;
    var delId = JSON.parse(req.body.id);

    deleteTodos(userId, delId, function() {
        console.log("Todo Deleted");
        res.end("Todo deleted");
    })
})

app.post("/check", function(req, res) {
    var userId = req.session.userId;
    var compID = JSON.parse(req.body.id);

    checkUserTodo(userId, compID, function() {
        console.log("Todo checked");
        res.end("Todo checked");
    })
})

app.post("/edit", function(req, res) {
    var userId = req.session.userId;
    var editID = JSON.parse(req.body.id);
    var editName = req.body.edit;

    editUserTodo(userId, editID, editName, function() {
        console.log("Task Edited");
        res.end("Task Edited");
    })

})

/*function readUserSignup(userEmail , callback)
{
  /*var collection = dbInstance.collection("Details") 

  collection.find({ email:userEmail }).toArray().then(function(data)
  {
    callback(data);
  })*/

/*userModel.find({email : userEmail}).then(function(data)
  {
    callback(data);
  })
  
}*/

function writeUser(user, callback) {
    /*var collection = dbInstance.collection("Details")

    collection.insert(user).then(function(data)
    {
    callback(data);
    }) */

    userModel.create(user, function(err) {
        if (err) {
            console.log(err);
        }
        callback();
    })
}

function readUserLogin(newEmail, newPassword, callback) {
    /*var collection = dbInstance.collection("Details");

    collection.find({email : newEmail , password : newPassword }).toArray().then(function(data)
    {
      callback(data);
    })*/

    userModel.findOne({ email: newEmail, password: newPassword }).then(function(users) {
        callback(users);
    })
}

function saveUserTodos(todos, callback) {
    /*var collection = dbInstance.collection(userEmail);

    collection.insert(todos).then(function()
    {
      callback();
    })*/

    todoModel.create(todos, function(err) {
        if (err) {
            console.log(err);
        }
        callback();
    })
}

function getUserTodos(userId, callback) {
    /*var collection = dbInstance.collection(userEmail);

    collection.find({ }).toArray().then(function(todos)
    {
      callback(todos);
    })*/

    todoModel.find({ createdBy: userId }).then(function(todos) {
        callback(todos);
    })
}

function deleteTodos(userId, delId, callback) {
    /*var collection = dbInstance.collection(userEmail);

    collection.deleteMany({id : delId}).then(function()
    {
      callback();
    })*/

    todoModel.deleteOne({ createdBy: userId, id: delId }).then(function() {
        callback();
    })
}

function editUserTodo(userId, editID, editName, callback) {
    /* var collection = dbInstance.collection(userEmail);

     collection.updateOne({id : editID} , {$set : {todo : editName}}).then(function()
     {
       callback();
     })*/

    todoModel.updateOne({ createdBy: userId, id: editID }, { todo: editName }).then(function() {
        callback();
    })
}

function checkUserTodo(userId, compID, callback) {
    /*var collection = dbInstance.collection(userEmail);

    collection.find({id : compID}).toArray().then(function(data)
    {
      if(data.length)
      {
        var iscomplete = data[0].complete;
        var newcomplete = !iscomplete;

        collection.updateOne({id : compID} , { $set : {complete : newcomplete}}).then(function()
        {
          callback();
        })
      }
    })*/

    todoModel.findOne({ createdBy: userId, id: compID }).then(function(data) {
        var isComplete = data.complete;
        var newComplete = !isComplete;

        todoModel.updateOne({ createdBy: userId, id: compID }, { complete: newComplete }).then(function() {
            callback();
        })
    })
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})