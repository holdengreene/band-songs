<template>
  <nav class="menu">
    <div class="container">
      <div class="menu__title">
        <nuxt-link to="/">PPK</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  background-color: var(--main-color);
  padding: rem(15px) 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu__title {
  font-size: rem(24px);

  a {
    color: #000;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
