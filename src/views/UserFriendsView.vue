<template>
  <div class="container">
    <div v-if="token">
      <div class="row">
        <div class="col-md-12" v-if="friends && friends.length > 0">
          <h1>Ваши друзья</h1>
          <ul class="list-group">
            <li class="list-group-item" v-for="friend in friends" :key="friend.id">
              <div class="row">
                <div class="col-md-8">
                  <router-link :to="{ name: 'FriendProfileView', props: { user: friend.receiver} }">
                    {{ friend.receiver.firstName }} {{ friend.receiver.lastName }}
                  </router-link>
                </div>
                <div class="col-md-4 text-right">
                  <button class="btn btn-danger btn-sm" @click="deleteFriend(token, friend.receiver.id)">
                    удалить
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-12" v-else>
          <p>Нету друзей(</p>
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

export default {
  name: "UserFriendsView",
  data() {
    return {
      token: AuthService.getUserToken(),
      friends: [],
    };
  },
  mounted() {
    if (this.token) {
      this.getFriends();
    }
  },
  methods: {
    async getFriends() {
      try {
        this.friends = await FriendsService.getFriendList(this.token);
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
  },
};
</script>