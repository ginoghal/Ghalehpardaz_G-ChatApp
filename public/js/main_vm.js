// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID, message}) {
  
   vm.socketID = sID;
}

function runDisconnectMessage(packet) {
    let messageArea = document.querySelector("section.messages");
    messageArea.innerHTML += `<p class="message-update">${vm.nickName} has left the chat</p>`;
 
    console.log(packet);
    // vm.nickName(packet)
}


function appendNewMessage(msg) {
    //takes the incoming message and pushes it into the Vue instance
    //into the messages array
    vm.messages.push(msg);
}

//this is our main Vue instance


const vm = new Vue({

data:{
    socketID:"",
    messages:[],
    message: "",
    nickName: "",
    time: "",
}, 

methods: {
    dispatchMessage() {
        //emit a message event and send the message to the server
        console.log('handle send message');
            var currentDate = new Date();

  
        socket.emit('chat_message', {
            content: this.message,
            name: this.nickName || "annonymous"
            // || is called a double pipe operator or an "or" operator
            //if this.nickName is set, use it as the value
            // or just make name "annoymous"
        })

        this.message = "";
    }

},

components: {
    newmessage: ChatMessage
},

mounted: function() {
    console.log('mounted');
}

}).$mount("#app");


// some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);