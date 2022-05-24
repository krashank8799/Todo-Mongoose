var usernameDetailInput = document.getElementById("usernamedetailinput")
var passwordDetailInput = document.getElementById("passworddetailinput")
var emailDetailInput = document.getElementById("emaildetailinput")
var dateofbirthDetailiInput = document.getElementById("dateofbirthdetailinput")
var numberDetailInput = document.getElementById("numberdetailinput")
var saveSignupDetail = document.getElementById("savesignupdetail")

saveSignupDetail.addEventListener("click", function(event) {
    event.preventDefault();
    signupDetails();
})

function signupDetails() {
    var details = {
        username: usernameDetailInput.value,
        password: passwordDetailInput.value,
        email: emailDetailInput.value,
        dob: dateofbirthDetailiInput.value,
        number: numberDetailInput.value,
        todos: []
    }

    if (usernameDetailInput.value != "" && passwordDetailInput.value != "" && emailDetailInput.value != "" && dateofbirthDetailiInput.value != "" && numberDetailInput.value != "") {
        var request = new XMLHttpRequest();
        request.open("POST", "/signup");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(details));

        request.addEventListener("load", function() {
            if (request.status === 404) {
                alert("Email already Exist");
            } else if (request.status === 200) {
                console.log("Signup success")
                window.location.href = "/login.html";
            }
        })
    } else {
        alert("Please fill the details")
    }
}