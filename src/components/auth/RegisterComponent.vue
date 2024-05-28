<script>
import AuthService from '@/services/auth.service';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      successful: false,
      message: '',
    };
  },

  methods: {
    handleRegister() {
      this.message = '';
      this.successful = false;

      AuthService.register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        },
      ).then(
        response => {
          this.message = response.message;
          this.successful = true;
          this.$router.push('/login');
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.successful = false;
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
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="firstName">Имя</label>
            <input type="text" class="form-control" id="firstName" v-model="firstName" required>
          </div>
          <div class="form-group">
            <label for="lastName">Фамилия</label>
            <input type="text" class="form-control" id="lastName" v-model="lastName" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
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