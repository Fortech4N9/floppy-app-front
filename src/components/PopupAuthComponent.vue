<script>
export default {
  name: 'PopupAuthComponent',
  methods: {
    redirectToRegistration() {
      // Редирект на страницу регистрации
      this.$router.push('/register');
    },
    redirectToLogin() {
      // Редирект на страницу входа
      this.$router.push('/login');
    }
  }
};
</script>

<template>
  <div class="popup">
    <div class="popup-content">
      <button @click="redirectToRegistration" class="btn btn-primary">Создание</button>
      <button @click="redirectToLogin" class="btn btn-secondary">Вход</button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.btn {
  margin: 10px;
}
</style>