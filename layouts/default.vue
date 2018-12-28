<template>
  <div class="default">
    <MenuBar/>
    <div class="container">
      <nuxt/>
    </div>
    <FooterSection/>
  </div>
</template>

<script>
import MenuBar from '~/components/MenuBar.vue';
import FooterSection from '~/components/FooterSection.vue';

export default {
  components: {
    MenuBar,
    FooterSection
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
  --background: #f5f5f6;
}

.default {
  background-color: var(--background);
}
</style>
