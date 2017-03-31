/**
 * Created by will on 01/08/16.
 */
var chatDiv = document.getElementById("chat");
var chatOutput = document.getElementById("chat-output");
var chatInput = document.getElementById("chat-input");
var chatForm = document.getElementById("chat-form");
//f(!isMobile) {
//   socket.on('serverMessage', function(message) {
//       chatOutput.innerHTML += "<p style='font: 18px bold arial'>" + message + "</p>"
//       chatDiv.scrollTop = chatDiv.scrollHeight;
//   });
//   chatForm.onsubmit = function(e) {
//       e.preventDefault();
//
//       socket.emit('clientMessage', chatInput.value);
//       chatInput.value = '';
//   };
//
//lse {
//   chatDiv.style.display = 'none';
//
socket.on('serverMessage', function(message) {
        chatOutput.innerHTML += "<p style='font: 18px bold arial'>" + message + "</p>"
        chatDiv.scrollTop = chatDiv.scrollHeight;
    });
    chatForm.onsubmit = function(e) {
        e.preventDefault();

        socket.emit('clientMessage', chatInput.value);
        chatInput.value = '';
    };

if(isMobile) {
    chatDiv.style.left = "220px";
    chatDiv.style.width = "70%";
}