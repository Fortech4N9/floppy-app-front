<script>
import AuthService from '../services/auth.service';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      message: '',
    };
  },
  methods: {
    handleLogin() {
      this.message = '';
      this.loading = true;

      AuthService.login({
        email: this.email,
        password: this.password,
      }).then(
        () => {
          this.$router.push('/profile');
          this.loading = false;
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.loading = false;
          this.message = resMessage;
        },
      );
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
.form-group {
  margin-bottom: 20px;
}
</style>