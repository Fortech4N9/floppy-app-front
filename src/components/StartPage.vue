<template>
  <div v-if="!user" class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Будь с нами</h2>
        <button @click="openPopup" class="btn btn-primary">Открыть</button>
      </div>
    </div>
    <PopupAuthComponent v-if="showPopup" @create="redirectToRegister" @login="redirectToLogin" />
  </div>
  <div v-else>
    <nav class="links">
      <router-link to="/profile">Твой профиль, {{ user.firstName }}</router-link>
      <router-link to="/your-friends">Твои друзья</router-link>
      <router-link to="/your-future-friends">Твои будущие друзья</router-link>
    </nav>
  </div>
</template>

<script>
import PopupAuthComponent from '../components/PopupAuthComponent.vue';
import AuthService from '../services/auth.service';

export default {
  name: 'StartPage',
  components: {
    PopupAuthComponent,
  },
  data() {
    return {
      showPopup: false,
      user: AuthService.getCurrentUser(),
    };
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    redirectToRegister() {
      this.$router.push('/register');
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
  .links{
    gap: 20px;
    display: flex;
    justify-content: center;
  }
</style>
