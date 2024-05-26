<template>
  <header>
    <div class="container">
      <div class="header-content">
        <img src="./images/logo.webp" class="logo-image" alt="logo">
        <span class="logo-title">FloppyApp</span>
      </div>
    </div>
  </header>
  <div class="main">
    <router-view/>
  </div>
  <footer>
    <div class="container footer">
      <span class="footer-title">При поддержке кафедры ЭВМ и Бинарных псов</span>
    </div>
  </footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.header-content{
  display: flex;
  gap: 20px;
  justify-content: center;
  background-color: #88E7E7;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 0 0 15px 15px;
}

.logo-image{
  max-width: 58px;
  height: auto;
}

.logo-title{
  vertical-align: bottom;
  color: #3D5A80;
  font-weight: 550;
  font-size: calc(24px + (34 - 24) * ((100vw - 320px) / (1280 - 320)));
}

.main{
  padding-bottom: 80px; /* Высота футера */
}
footer{
  vertical-align: center;
  margin-top: -80px;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.container.footer{
  background-color: #293241;
  height: 80px;
  border-radius: 15px 15px 0 0;
}

.footer-title{
  font-family: "Rubik", sans-serif;
  font-size: calc(24px + (34 - 24) * ((100vw - 320px) / (1280 - 320)));
  margin: auto;
}
</style>
<script setup>
</script>