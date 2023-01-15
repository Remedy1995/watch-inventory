const socket = io();
const form = document.getElementById("form-container");
const messageField = document.getElementById("form-container");
const messageBox = document.getElementById("message-box");
const connected_User = document.getElementById("firstname");
const music= document.getElementById("music");
const connection = document.getElementById("connection");
const submit = document.getElementById("submit");
const showNotification = document.getElementById("show-notification");
const userTyping =document.getElementById("show-typing");
music.muted =true;
let checkUser =false;
let a = 1;
let currentUser = " ";

function popUpNotification(a){
const alert = document.createElement('div');
alert.innerHTML += a + '&times;';
showNotification.appendChild(alert);
alert.setAttribute('onclick','this.parentElement.style.display="none"');
alert.style.color="red";
alert.style.cursor="pointer";
alert.style.background = "black";
alert.style.transition = "0.3s";
alert.style.float = "right";
}

document.body.addEventListener('mousemove', () => {
    music.muted = false;
  });
if( connected_User.style.display === "block" && music.style.display === "block"){
    connected_User.style.display="none";
    music.style.display="none";
}

appendMessage("you joined")
socket.emit('new-user',connected_User.innerHTML)
socket.on('chat-message',chat =>{  
if(chat.message){
    document.getElementById("show-mess").style.display='block';
    document.getElementById('message-pop').innerHTML='You have a new message &times;';
    playSound();
}

appendMessage(`${chat.user}: ${chat.message}`);
})

socket.on('user-disconnected',user=>{
// appendMessage(`${user} disconnected`);
connection.innerHTML = `${user} disconnected`;
})
socket.on('connected-user',user =>{
    console.log(user)
    currentUser = user;
// appendMessage(`${user} connected`)
connection.innerHTML = `${user} connected`;
})
//show the user who is typing
socket.on('show-type',showtype=>{
userTyping.innerHTML = showtype;
})
console.log(checkUser)
form.addEventListener('submit',function(e){
e.preventDefault();
const message = messageBox.value;
if(message === ''){
    console.log('no data has been entered');
    return false;
}
else{
  checkUser = true;
 //show current user typing message 
appendMessage(`You : ${message}`);
console.log('ok')
socket.emit('send-message',message);
userTyping.style.display = "none";
messageBox.value = '';
console.log(checkUser)
}
})

function appendMessage(message){
 const messageElement = document.createElement("div");
 messageElement.textContent = message;
 messageField.appendChild(messageElement);
}
console.log(checkUser)


document.addEventListener('keypress',function(event){
     socket.emit('show-typing',connected_User.innerHTML + ` is typing`)
 })


 document.addEventListener('keyup',function(event){
   console.log('key has been released')
 })
function playSound(){
        music.play().catch(error=>{
            console.log(error)
        });
}
;
