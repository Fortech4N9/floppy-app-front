<template>
  <div v-if="showPopup" class="profile-editor-popup">
    <div class="popup-content">
      <div class="popup-header">
        <h2>Редактор профиля</h2>
        <img
            src="../../images/icons/icons8-close.svg"
            id="close-auth-popup"
            class="popup-close"
            @click="closePopup"
        />
      </div>
      <div class="editor-container">
        <div class="preview-area">
          <h3>Предпросмотр</h3>
          <ProfileContent :layout="layout" :user="user" />
        </div>

        <div class="components">
          <div class="components-select">
            <h3>Выбранные компоненты</h3>
            <draggable v-model="layout.components" handle=".drag-handle" item-key="id" group="components" style="height: 100%">
              <template #item="{ element }">
                <div class="draggable-component drag-handle" >
                   {{ element.name }}
                </div>
              </template>
            </draggable>
          </div>
          <div class="components-list">
            <h4>Доступные компоненты:</h4>
            <draggable v-model="availableComponents" handle=".drag-handle" item-key="id" group="components" style="height: 100%">
              <template #item="{ element }">
                <div class="draggable-component drag-handle">
                   {{ element.name }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>

      <button @click="saveLayout" class="btn btn-primary save-redactor-btn">Сохранить</button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ProfileContent from './ProfileContent.vue';
import ProfileService from "@/services/profile.service";

export default {
  name: 'ProfileEditorPopup',
  components: {
    draggable,
    ProfileContent,
  },
  props: {
    showPopup: Boolean,
    user: Object,
    token: String,
  },
  data() {
    return {
      layout: {
        components: [],
      },
      availableComponents: [],
    };
  },
  mounted() {
    ProfileService.getProfileComponents(this.user, this.token).then((data)=>{
      this.layout.components = data;
    });
    ProfileService.getUnusedProfileComponents(this.user, this.token).then((data)=>{
      this.availableComponents = data;
    });
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    saveLayout() {
      this.$emit('layout-saved', this.layout, this.layout.components, this.user);
      this.closePopup();
    },
  },
};

</script>

<style scoped>
.profile-editor-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  height: 100%;
}

.popup-header{
  display: flex;
  justify-content: space-between;
}

.editor-container {
  display: flex;
  gap: 20px;
}
.preview-area{
  width: 70%;
}
.components{
  width: 30%;
  display: flex;
  flex-direction: column;
}

.components-select,
.components-list {
  flex: 1;
}

.preview-area, .components {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 70vh;
  margin-bottom: 20px;
}

.draggable-component {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  cursor: move;
}

.drag-handle {
  cursor: grab;
  margin-right: 10px;
}

.popup-close{
  max-width: 32px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.popup-close:hover {
  transform: rotate(90deg);
}

.save-redactor-btn{
  max-width: fit-content;
  text-align: center;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: calc(12px + (34 - 24) * ((100vw - 320px) / (1280 - 320)));
}
</style>