<template>
  <div class="container">
      <div class="profile-container">
        <div v-if="layout">
          <ProfileContent  :layout="layout" :user="user"/>
        </div>
        <div class="load-block" v-else>
          <img class="load" src="../../images/icons/work-in-progress.gif">
        </div>
      </div>
  </div>
</template>

<script>

import ProfileContent from "@/components/profile/ProfileContent.vue";
import AuthService from "@/services/auth.service";
import ProfileService from "@/services/profile.service";

export default {
  name: 'FriendProfileView',
  components: {ProfileContent},
  data() {
    return {
      token: AuthService.getUserToken(),
      layout: null,
      user: null
    };
  },
  mounted() {
    const userId = this.$route.params.userId;
    ProfileService.getUser(userId, this.token).then(data =>{
      this.user = data;
    });
    ProfileService.getLayout({id:userId},this.token).then(data=>this.layout=data);
  },
};
</script>

<style scoped>
.load{
  max-width: 20vh;
}
.load-block{
margin: auto;
}
</style>