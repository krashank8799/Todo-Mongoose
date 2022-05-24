var emailIDInput = document.getElementById("emailidinput")
var passwordInput = document.getElementById("passwordinput")
var loginButton = document.getElementById("loginbutton")
var signupbutton = document.getElementById("signupbutton")

loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    onLoginClick()
})

signupbutton.addEventListener("click", function(event) {
    event.preventDefault();
    onSignupClick()
})

function onLoginClick() {
    if (emailIDInput.value != "" && passwordInput.value != "") {
        console.log("login")
        var loginDetails = {
            loginID: emailIDInput.value,
            loginPassword: passwordInput.value
        }

        var request = new XMLHttpRequest();
        request.open("POST", "/userlogin");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(loginDetails));

        request.addEventListener("load", function() {
            if (request.status === 200 || request.responseText == "Logic Success") {
                console.log("Login Successfull")

                var username = request.responseText
                console.log(username);

                localStorage.setItem("name", JSON.stringify(username))
                    //showUserTodo(username);

                window.location.href = "/";
            } else {
                alert("Invalid email or password")
            }
        })
    } else {
        alert("Please fill the details")
    }
}

function onSignupClick() {
    window.location.href = "/signup.html";
}

/*function showUserTodo(username)
{
  var request = new XMLHttpRequest();
  request.open("POST" , "/savetodo");
  request.setRequestHeader("Content-type" , "application/json")
  request.send(JSON.stringify(username));

  request.addEventListener("load" , function()
  {
    if(request.status === 200)
    {
      console.log("Todos saved succefully")

      //getUserTodo();
      //window.location.href = "/welcome.html";
    }
    else
    {
      console.log("Error while saving todos")
    }
  })
}

/*function getUserTodo()
{
  var request = new XMLHttpRequest();
  request.open("GET" , "/gettodo");
  request.send();

  request.addEventListener("load" , function()
  {
    if(request.status === 200)
    {
    var todos = JSON.parse(request.responseText);

    console.log(todos);

    }

  })
}*/