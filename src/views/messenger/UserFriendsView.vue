<template>
  <div class="container">
    <div v-if="token">
      <h1 class="messenger-title">Ваши друзья</h1>
      <div class="messenger">
        <div class="col-md-4" v-if="friends && friends.length > 0">
          <ul class="list-group">
            <li
                class="list-group-item"
                v-for="friend in friends"
                :key="friend.id"
                :class="{ active: activeFriend && activeFriend.id === friend.id }"
                @click="setActiveFriend(friend)"
            >
                  <div class="row">
                    <div class="col-md-4">
                      <img class="avatar" src="../../images/icons/icons8-avatar.gif">
                      <img class="check-user"  v-if="friend.isActive" src="../../images/icons/check.png">
                    </div>
                    <div class="col-md-8">
                      <router-link :to="{ name: 'FriendProfileView', params: { userId: friend.id } }">
                      {{ friend.firstName }} {{ friend.lastName }}
                    </router-link>
                    </div>
                  </div>
<!--                <div class="col-md-4 text-right">-->
<!--                  <button class="btn btn-danger btn-sm" @click="deleteFriend(token, friend.receiver.id)">-->
<!--                    удалить-->
<!--                  </button>-->
<!--                </div>-->
            </li>
          </ul>
        </div>
        <div class="col-md-4" v-else>
          <p>Нету друзей(</p>
        </div>
        <div class="chat">
          <ChatComponent
              v-if="activeFriend"
              :key="activeFriend.id"
              :friend="activeFriend"
              :user="user"
              :token="token"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Вы не вошли в аккаунт</h1>
      <div class="accordion">
        <router-link to="/register" class="btn btn-primary">Зарегистрируйся</router-link>
        <router-link to="/login" class="btn btn-primary">Авторизуйся</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import FriendsService from "@/services/friends.service";
import {PresenceService} from "@/services/presence.service";
import ChatComponent from "@/components/chat/ChatComponent.vue";

export default {
  name: "UserFriendsView",
  components: {
    ChatComponent,
  },
  data() {
    return {
      token: AuthService.getUserToken(),
      user:  AuthService.getCurrentUser(),
      friends: [],
      presenceService: null,
      activeFriend:null,
    };
  },
  mounted() {
    if (this.token) {
      this.getFriends();
      this.presenceService = new PresenceService(this.token);
      this.presenceService.socket.on('friendActive', (data) => {
        for (let i = 0; i < this.friends.length; i++) {
          if (this.friends[i].id === data.id) {
            this.friends[i].isActive = data.isActive;
          }
        }
      });
      this.presenceService.updateOwnStatus(true);
    }
  },
  methods: {
    async getFriends() {
      try {
        this.friends = await FriendsService.getFriendList(this.token, this.user);
      } catch (error) {
        console.error("Ошибка при получении списка друзей:", error);
      }
    },
    async deleteFriend(token, id) {
      try {
        await FriendsService.deleteFriend(token, id);
        this.friends = this.friends.filter((friend) => friend.id !== id);
      } catch (error) {
        console.error("Ошибка при добавлении друга:", error);
      }
    },
    async setActiveFriend(friend) {
      this.activeFriend = friend;
    },
  }
};
</script>

<style>

.check-user{
  max-width: 16px;
}

.messenger{
  display: flex;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
}
.avatar{
  max-width: 32px;
}

.col-md-8 a{
  font-family: "Rubik", sans-serif;
  text-decoration: none;
}

.col-md-4{
  display: block;
}

.chat{
  flex: 1;
}
.messenger-title{
  font-family: "Rubik", sans-serif;
  color: #3D5A80;
  font-weight: normal;
}
.list-group-item.active {
  background-color: #e9ecef;
}
</style>