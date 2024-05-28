<script>
export default {
  name: 'PopupAuthComponent',
  methods: {
    redirectToRegistration() {
      this.$router.push('/register');
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
    closePopup() {
      this.$emit('close');
    }
  }
};
</script>

<template>
  <div class="popup" @click="closePopup">
    <div class="popup-content" @click.stop>
      <img
          src="../../images/icons/icons8-close.svg"
          id="close-auth-popup"
          class="auth-popup-close"
          @click="closePopup"
      />
      <div class="auth-popup-content">
        <button @click="redirectToRegistration" class="btn btn-primary">
          Создание
        </button>
        <button @click="redirectToLogin" class="btn btn-secondary">
          Вход
        </button>
      </div>
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
  text-align: center;
  display: block;
  border-radius: 20px;
  box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
}

.btn {
  margin: 10px;
}

.auth-popup-close{
  max-width: 24px;
  float: right;
  display: block;
}

.auth-popup-content{
  display: flex;
  margin: 40px;
  max-width: 280px;
}

.btn-primary{
  border-radius: 12px;
}

.btn-secondary{
  border-radius: 12px;
}

</style>