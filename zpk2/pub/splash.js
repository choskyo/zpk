/**
 * Created by will on 01/08/16.
 */
var gameDiv         = document.getElementById("gameDiv");
var splashScreen    = document.getElementById("splashScreen");
var loginUsername   = document.getElementById("username");
var loginPassword   = document.getElementById("password");
var btnLogin        = document.getElementById("login");
var btnRegister     = document.getElementById("register");
var loginResponse   = document.getElementById("loginResponse");

btnLogin.onclick = function() {
    socket.emit('loginRequest', {username: loginUsername.value, password: loginPassword.value});
};
socket.on('loginResponse', function(response) {

    if(response.success == true) {
        splashScreen.style.display = 'none';
        gameDiv.style.display = 'inline';
    } else {
        loginResponse.innerHTML = "Login failed :(";
    }
});

btnRegister.onclick = function() {
    socket.emit('regRequest', {username: loginUsername.value, password: loginPassword.value});
};
socket.on('regResponse', function(response) {
    if(response.success == false) {
        loginResponse.innerHTML = "Username taken :(";
    } else {
        loginResponse.style.color = "#AFA";
        loginResponse.innerHTML = "Registration success! :D";
    }
});