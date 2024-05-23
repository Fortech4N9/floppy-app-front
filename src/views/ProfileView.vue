<template>
  <div class="container">
    <div v-if="user">
      <div class="profile-container">
        <h1>Профиль пользователя</h1>
        <p><strong>Имя:</strong> {{ user.firstName }}</p>
        <p><strong>Фамилия:</strong> {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <button @click="handleLogout" class="btn btn-primary">Выйти</button>
    </div>
    <div v-else>
      <h1>Вы не вошли в аккаунт</h1>
      <div class="accordion">
        <router-link to="/register">Зарегестрируйся</router-link>
        <router-link to="/register">Авторизуйся</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/auth.service';

export default {
  data() {
    return {
      user: AuthService.getCurrentUser(),
    };
  },
  methods: {
    handleLogout() {
      AuthService.logout();
      this.user = null;
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 30px auto;
}
.accordion{
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: auto;
}
</style>