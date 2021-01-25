
const mesaageForm = document.getElementById("submits")
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const userInfo = document.getElementById('user-info')
let newPerson = ''



// connect to the server socket
const socket = io('http://localhost:3000/', {
  withCredentials: true
});

//listen to the socket for content with the tag 'chat-message'
socket.on('chat-message', data => {
    if (data.message != "") {
      appendMessage(`${data.name}: ${data.message}`)

    }
})

//listen to the socket for content with the tag 'user-in'
socket.on('user-in', newname => {
  newPerson = newname
})


//listen to the socket for user disconnection
socket.on('user-disconnected', name => {
  appendMessage(`${name}: disconnected`)
})


//ask the user for their name
const username = prompt('What is your name ?😃')

userInfo.innerHTML = username!="" ? `You are online ${username}` : "User 1"
socket.emit('username', username)


// if the user taps the send button or presses enter, the message should be sent.
mesaageForm.addEventListener('click', e =>{
    e.preventDefault()
    const message  = `${messageInput.value}`
    if (message != "") {

      // the emit method sends the message out with the tag: 'send-chat-message' 
      socket.emit('send-chat-message', message)
      appendMessageForMe(message)
      messageInput.value = ''
    }
    
})
messageInput.addEventListener('keydown', e =>{
  if (e.key === "Enter") {
    e.preventDefault()
    const message  = `${messageInput.value}`
    if (message != "") {
      socket.emit('send-chat-message', message)
      appendMessageForMe(message)
      messageInput.value = ''
    }
  }
 
  
})


// send message to reciever
function appendMessage(message){
  let man = messageContainer.scrollHeight + 500;
  messageContainer.scroll = man
  var wrapper= document.createElement('div');
wrapper.innerHTML = `

    <div class="d-flex justify-content-start mb-4">
      <div class="img_cont_msg">
        <img src="https://res.cloudinary.com/dbkakssug/image/upload/v1608501683/Image_4.png" class="rounded-circle user_img_msg">
      </div>
      <div class="msg_cotainer"> ${message}<span class="msg_time">${new Date().getDate()+ '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear()}</span>
      </div>
    </div>
              `
      messageContainer.append(wrapper)
}



//show message on sender's screen
function appendMessageForMe(message){
  messageContainer.scrollTop = messageContainer.scrollHeight;

  var wrapper= document.createElement('div');
wrapper.innerHTML = `
    <div class="d-flex justify-content-end mb-4">
      <div class="msg_cotainer_send justify-content-end ">${message}<span class="msg_time_send">${new Date().getDate()+ '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear()} </span>
      </div>
      <div class="img_cont_msg">
        <img src="https://res.cloudinary.com/dbkakssug/image/upload/v1608501683/Image_4.png" class="rounded-circle user_img_msg">
      </div>
    </div>
              `
      messageContainer.append(wrapper)
}