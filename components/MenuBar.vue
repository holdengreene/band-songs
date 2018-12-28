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
  padding: rem(15px);
  display: flex;
  justify-content: space-between;
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

@media screen and (min-width: $main-break) {
  .menu {
    padding: rem(15px) rem(50px);
  }
}

</style>
