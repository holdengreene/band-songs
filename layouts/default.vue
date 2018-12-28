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
  --secondary: #fff176;
  --secondary-light: #ffffa8;
  --secondary-dark: #cabf45;
  --background: #f5f5f6;
}
.default {
  background-color: var(--background);
  display: grid;
  grid-template-areas:
    'nav nav nav'
    '. content . '
    'footer footer footer';
  grid-template-columns: rem(15px) 1fr rem(15px);
  gap: rem(25px) 0;
}

nav {
  grid-area: nav;
}

.container {
  // Push the footer down
  min-height: 85vh;
  grid-area: content;
}

footer {
  grid-area: footer;
}

.btn {
  // display: inline-block;
  position: relative;
  border: none;
  font-size: rem(20px);
  padding: rem(5px);
  border-radius: rem(3px);
  box-shadow: $box-shadow;
  transition: background-color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: $box-shadow-hover;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after,
  &:focus::after {
    outline: 0;
    opacity: 1;
  }
}

.btn--primary {
  background-color: var(--secondary);

  &:hover,
  &:focus {
    outline: 0;
    cursor: pointer;
    background-color: var(--secondary-light);
  }
}

.btn--light {
  background-color: var(--background);

  &:hover,
  &:focus {
    outline: 0;
    cursor: pointer;
    background-color: #e3e3e3;
  }
}

@media screen and (min-width: $main-break) {
  .default {
    grid-template-columns: 1fr 3fr 1fr;
  }
}
</style>
