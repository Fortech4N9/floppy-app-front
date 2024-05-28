<template>
  <div v-if="layout && layout.components && layout.components.length > 0" class="profile-content">
    <div v-for="(component, index) in layout.components" :key="index">
      <div v-html="interpolatedHtml(component.html)"></div>
    </div>
  </div>
  <div v-else>
    <h1 class="empty-profile">Заполни свою страницу сам!</h1>
  </div>
</template>

<script>

import HelperService from "@/services/helper.service";

export default {
  props: {
    layout: Object,
    user: Object,
  },
  methods:{
    interpolatedHtml(html){
      return HelperService.interpolatedHtml(this.user, html)
    }
  }
};
</script>