<template>
  <div>
    <MenuBar/>
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import MenuBar from '~/components/MenuBar.vue';

export default {
  components: {
    MenuBar
  }
};
</script>

<style lang="scss">
:root {
  --main-color: #2196f3;
  --main-light: #6ec6ff;
  --main-dark: #0069c0;
  --secondary: #ff5722;
  --secondary-light: #ff8a59;
  --secondary-dark: #c41c00;
}
</style>
