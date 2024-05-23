<template>
  <div class="container">
    <div v-if="this.user" class="row">
      <div class="col-md-12">
        <h1>Профиль друга</h1>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ this.user.firstName }} {{this.user.lastName}}}</h5>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Загрузка профиля...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FriendProfileView',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
};
</script>