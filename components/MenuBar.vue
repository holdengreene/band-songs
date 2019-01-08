<template>
  <div class="menu">
    <button class="menu__toggle" @click="navOpened = !navOpened"/>

    <MenuSidebar :open="navOpened" @update:navOpened="navOpened = $event"/>

    <div class="menu__title">
      <nuxt-link to="/">
        <img class="title__image" src="~assets/img/logo-white.svg" alt="PPK Logo">
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import MenuSidebar from '~/components/MenuSidebar.vue';

export default {
  components: {
    MenuSidebar
  },
  data() {
    return {
      navOpened: false
    };
  }
};
</script>


<style lang="scss" scoped>
.menu {
  background-color: var(--main-color);
  padding: rem(15px);
  display: flex;
  align-items: center;
  box-shadow: $box-shadow;
}

.menu__toggle {
  background-image: url('~assets/img/menu-icon.svg');
  background-size: cover;
  background-color: transparent;
  border: none;
  height: rem(32px);
  width: rem(32px);
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

.menu__title {
  margin-left: rem(30px);
  cursor: pointer;
}

.title__image {
  height: rem(55px);
  width: 100%;
}

@media screen and (min-width: $main-break) {
  .menu {
    padding: rem(15px) rem(50px);
  }
}
</style>
