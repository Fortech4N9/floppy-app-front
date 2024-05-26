<script>

import {ChatService} from "@/services/chat.service";

export default {
    name: "ChatComponent",
    props: {
      friend: {
        type: Object,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      },
      token: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        newMessageText: "",
        messages: [],
        chatService: null,
      };
    },
  mounted() {
    if (this.token) {
      this.chatService = new ChatService(this.token);
      this.chatService.getMessages(this.friend.id).then(responseData => {
        this.messages = responseData;
      });
      this.chatService.socket.on('newMessage', (data) => {
        this.messages.push(
            {
              message: data.message,
              id: data.id,
              user:{id: data.creatorId},
              conversationId:data.conversationId,
              createdAt: new Date(),
            }
        );
      });
    }
  },
    methods: {
      sendMessage() {
        if (this.newMessageText.trim() !== "") {
          this.chatService.sendMessage({
            message: this.newMessageText,
            conservationId: this.chatService.getConservation(this.friend.id),
            friendId: this.friend.id,
          });
          this.messages.push({
            message: this.newMessageText,
            user: {id:this.user.id},
            createdAt: new Date(),
          });
          this.newMessageText = "";
        }
      },
    },
  };
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="user-avatar">
        <img src="../images/icons/icons8-avatar.gif" alt="Аватар друга">
      </div>
      <div class="user-name">{{ friend.firstName }}</div>
    </div>
    <div class="chat-messages">
      <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{ 'message-left': message.user.id === friend.id, 'message-right': message.user.id !== friend.id }"
      >
        <div class="message-content">{{ message.message }}</div>
      </div>
    </div>
    <div class="chat-input">
      <input
          type="text"
          class="form-control"
          placeholder="Введите сообщение..."
          v-model="newMessageText"
          @keyup.enter="sendMessage"
      >
      <button @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  border: 2px solid #3D5A80;
  border-radius: 15px;
  padding: 10px;
  height: 100%;
}

.chat-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-weight: bold;
}

.chat-messages {
  height: 60vh;
  overflow-y: auto;
}

.message-left {
  font-family: "Rubik", sans-serif;
  margin-bottom: 10px;
  text-align: left;
  background-color: #eee;
  padding: 10px;
  border-radius: 5px 5px 0 5px;
}

.message-right {
  font-family: "Rubik", sans-serif;
  margin-bottom: 10px;
  text-align: right;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px 5px 5px 0;
}

.chat-input {
  display: flex;
  align-items: center;
}

.chat-input textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  font-family: "Rubik", sans-serif;
}

.chat-input button {
  padding: 10px;
  border: none;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  border-radius: 15px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
</style>