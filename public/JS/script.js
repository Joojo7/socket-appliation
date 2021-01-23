
const mesaageForm = document.getElementById("submits")
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const userInfo = document.getElementById('user-info')
let newPerson = ''


const socket = io('https://chat-app-sockets777.herokuapp.com/', {
  withCredentials: true
});

socket.on('chat-message', data => {
    if (data.message != "") {
      appendMessage(`${data.name}: ${data.message}`)

    }
})

socket.on('user-in', newname => {
  newPerson = newname
})


socket.on('user-disconnected', name => {
  appendMessage(`${name}: disconnected`)

})



const username = prompt('What is your name ?😃')

userInfo.innerHTML = `You are online ${username}`
socket.emit('username', username)



mesaageForm.addEventListener('click', e =>{
    e.preventDefault()
    const message  = `${messageInput.value}`
    if (message != "") {
      socket.emit('send-chat-message', message)
      appendMessageForMe(message)
      messageInput.value = ''
    }
    
})

mesaageForm.addEventListener('keyup', e =>{

  if (e.code === "13") {
    e.preventDefault()
    const message  = `${messageInput.value}`
    if (message != "") {
      socket.emit('send-chat-message', message)
      appendMessageForMe(message)
      messageInput.value = ''
    }
  }
 
  
})


function appendMessage(message){

  let man = messageContainer.scrollHeight + 500;
  messageContainer.scroll = man

  console.log('man:', man)
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