<template>
  <nav class="menu">
    <div class="menu__title">
      <nuxt-link to="/">PPK</nuxt-link>
    </div>
    <div class="menu__items">
      <nuxt-link to="/">All Songs</nuxt-link>
      <nuxt-link to="/create-song">Create Song</nuxt-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  background-color: var(--main-color);
  padding: rem(15px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu__title a {
  font-size: rem(24px);
  color: #000;
  cursor: pointer;
  text-decoration: none;
}

.menu__items a {
  color: #000;
  cursor: pointer;
  margin-right: rem(10px);
  padding: rem(5px);

  &.nuxt-link-exact-active {
    background-color: var(--main-light);
  }

  &:focus {
    text-decoration: none;
  }
}

@media screen and (min-width: $main-break) {
  .menu {
    padding: rem(15px) rem(50px);
  }

  .menu__items a {
    font-size: rem(20px);
    margin-right: rem(25px);
  }
}
</style>
