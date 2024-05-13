<template>
  <div class="container">
    <div v-if="!user" class="row justify-content-center">
      <div class="col-md-6">
        <h2>Авторизуйся</h2>
        <LoginComponent @login="handleLogin" />
      </div>
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-md-6">
        <h2>Добро пожаловать, {{ user.firstName }}!</h2>
        <button @click="handleLogout" class="btn btn-primary">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';
import AuthService from '../services/auth.service';

export default {
  name: 'LoginView',
  components: {
    LoginComponent,
  },
  data() {
    return {
      isLoggedIn: false,
      user: AuthService.getCurrentUser(),
    };
  },
  methods: {
    handleLogin(user) {
      this.user = user;
    },
    handleLogout() {
      AuthService.logout();
      this.user = null;
    },
  },
};
</script>

<style scoped>

</style>
