<template>
  <div class="container">
    <div v-if="user">
      
      <div class="profile-container">
        <div v-if="layout">
          <ProfileContent  :layout="layout" :user="user"/>
        </div>
        <div v-else>
          <img class="load" src="../../images/icons/work-in-progress.gif">
        </div>
      </div>
      <ProfileEditorPopup
          v-if="showPopup"
          :user="user"
          :token="token"
          :show-popup="showPopup"
          @close="showPopup = false"
          @layout-saved="handleLayoutSaved"
      />

      <div class="buttons">
        <button @click="openPopup" class="btn btn-primary redactor-btn" >Редактор</button>
        <button @click="handleLogout" class="btn btn-primary">Выйти</button>
      </div>
    </div>
    <div v-else>
      <h1>Вы не вошли в аккаунт</h1>
      <div class="accordion">
        <router-link to="/register">Зарегестрируйся</router-link>
        <router-link to="/login">Авторизуйся</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import AuthService from '../../services/auth.service';
import ProfileEditorPopup from '../../components/profile/ProfileEditorPopup.vue';
import ProfileContent from "@/components/profile/ProfileContent.vue";
import ProfileService from "@/services/profile.service";

export default {
  components: {
    ProfileContent,
    ProfileEditorPopup,
  },
  data() {
    return {
      user: AuthService.getCurrentUser(),
      token: AuthService.getUserToken(),
      layout: null,
      showPopup: false,
    };
  },
  mounted() {
    ProfileService.getLayout(this.user,this.token).then(data=>this.layout=data);
  },
  methods: {
    handleLogout() {
      AuthService.logout();
      this.user = null;
    },
    handleLayoutSaved(newLayout,components, user) {
      ProfileService.setProfileComponents(this.user,this.token, components);
      this.layout = newLayout;
      this.user = user;
    },
    openPopup() {
      this.showPopup = true;
    },
  },
};
</script>

<style scoped>
.container{
  position: sticky;
}
.profile-container {
  padding: 20px;
  margin: 30px auto;
}
.accordion{
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: auto;
}
.buttons{
  display: flex;
  gap: 20px;
  position: absolute;
  top: 70vh;
  right: 5vh;
}

.btn{
  max-width: fit-content;
  text-align: center;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: calc(12px + (34 - 24) * ((100vw - 320px) / (1280 - 320)));
}

.load{
  max-width: 44px;
}
</style>