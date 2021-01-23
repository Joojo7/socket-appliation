
const mesaageForm = document.getElementById("submits")
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const userInfo = document.getElementById('user-info')
let newPerson = ''


const socket = io('http://localhost:3000', {
  withCredentials: true
});

socket.on('chat-message', data => {
    appendMessage(data)
})

socket.on('user-in', newname => {
  newPerson = newname
  console.log('newPerson:', newPerson)
})



const username = prompt('What is your name ?😃')

userInfo.innerHTML = `You are online ${username}`
socket.emit('username', username)



mesaageForm.addEventListener('click', e =>{
    e.preventDefault()
    const message  = `${messageInput.value}`
    socket.emit('send-chat-message', message)
    appendMessageForMe(message)
    messageInput.value = ''
})


function appendMessage(message){
  messageContainer.scrollTop = messageContainer.scrollHeight;
  var wrapper= document.createElement('div');
wrapper.innerHTML = `

    <div class="d-flex justify-content-start mb-4">
      <div class="img_cont_msg">
        <img src="https://res.cloudinary.com/dbkakssug/image/upload/v1608501683/Image_4.png" class="rounded-circle user_img_msg">
      </div>
      <div class="msg_cotainer">${newPerson}: ${message}<span class="msg_time">${new Date().getDate()+ '-' + new Date().getMonth()+1 + '-' + new Date().getFullYear()}</span>
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