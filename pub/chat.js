/**
 * Created by will on 01/08/16.
 */
var chatDiv = document.getElementById("chat");
var chatOutput = document.getElementById("chat-output");
var chatInput = document.getElementById("chat-input");
var chatForm = document.getElementById("chat-form");
if(!isMobile) {
    socket.on('serverMessage', function(message) {
        chatOutput.innerHTML += "<p style='font: 18px bold arial'>" + message + "</p>"
    });
    chatForm.onsubmit = function(e) {
        e.preventDefault();

        socket.emit('clientMessage', chatInput.value);
        chatInput.value = '';
    };
}
else {
    chatDiv.style.display = 'none';
}