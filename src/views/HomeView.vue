<template>
  <div class="home">
    <StartPage msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import StartPage from '@/components/StartPage.vue';

export default {
  name: 'HomeView',
  components: {
    StartPage,
  },
};
</script>
