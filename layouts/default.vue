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
