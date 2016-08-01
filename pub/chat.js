/**
 * Created by will on 01/08/16.
 */
var chatOutput = document.getElementById("chat-output");
var chatInput = document.getElementById("chat-input");
var chatForm = document.getElementById("chat-form");
socket.on('serverMessage', function(message) {
    chatOutput.innerHTML += "<div STYLE='color:white; font: 18px bold arial'>" + message + "</div>"
});
chatForm.onsubmit = function(e) {
    e.preventDefault();

    socket.emit('clientMessage', chatInput.value);
    chatInput.value = '';
};