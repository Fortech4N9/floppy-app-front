<template>
  <div class="container">
    <div v-if="!user" class="row justify-content-center">
      <div class="col-md-6">
        <h2>Регистрация</h2>
        <RegisterComponent @register="handleRegister" />
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
import RegisterComponent from '../../components/auth/RegisterComponent.vue';
import AuthService from '../../services/auth.service';

export default {
  name: 'RegisterView',
  components: {
    RegisterComponent
  },
  data() {
    return {
      user: AuthService.getCurrentUser()
    };
  },
  methods: {
    handleRegister(user) {
      this.user = user;
    },
    handleLogout() {
      AuthService.logout();
      this.user = null;
    }
  }
}
</script>

<style scoped>

</style>