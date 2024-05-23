<template>
  <div class="container">
    <div v-if="token">
      <div class="row">
        <div class="col-md-12" v-if="friends && friends.length > 0">
          <h1>Ваши будущие друзья</h1>
          <ul class="list-group">
            <li class="list-group-item" v-for="friend in friends" :key="friend.id">
              <div class="row">
                <div class="col-md-4 text-left">
                  <img src="../images/icons/icons8-avatar.gif">
                </div>
                <div class="col-md-4">
                  <router-link :to="{ name: 'FriendProfileView', props: { user: friend} }">
                    {{ friend.firstName }} {{ friend.lastName }}
                  </router-link>
                </div>
                <div class="col-md-4 text-right">
                  <button class="btn btn-primary" @click="addFriend(token, friend.id)">
                    Добавить
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-12" v-else>
          <p>Нету пользователей(</p>
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
import AuthService from '@/services/auth.service';
import FriendsService from '@/services/friends.service';

export default {
  name: 'UserFutureFriendsView',
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
        this.friends = await FriendsService.getFutureFriends(this.token);
      } catch (error) {
        console.error('Ошибка при получении списка будущих друзей:', error);
      }
    },
    async addFriend(token, id) {
      try {
        console.log(id)
        await FriendsService.addFriend(token, id);
        this.friends = this.friends.filter((friend) => friend.id !== id);
      } catch (error) {
        console.error('Ошибка при добавлении друга:', error);
      }
    },
  },
};
</script>

<style>
.accordion{
  display: flex;
  gap: 20px;
  justify-content: center;
}

.col-md-4{
  margin: auto;
}
</style>