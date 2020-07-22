const chatForm = document.getElementById('chat-form');

const chatMessages = document.querySelector('.chat-messages')

// Get username and room from URL
const { username, room }= Qs.parse(location.search,{
  ignoreQueryPrefix: true
})


const socket = io();

//join chatroom
socket.emit('joinRoom', { username, room })

// Message from the server
socket.on('message', message =>{
  console.log("main.js",message);
  outputMessage(message);

  // Scroll down  
  chatMessages.scrollTop = chatMessages.scrollHeight;


})

// Message submit
chatForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  //get message
  const msg = e.target.elements.msg.value;

  console.log(msg);

  //emit a message to server
  socket.emit('chatMessage', msg)

  //clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
})

// output message to DOM
function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message');
  div.innerHTML= `<p class="meta">${message.user} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}