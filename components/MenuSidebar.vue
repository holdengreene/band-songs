<template>
  <div class="side-nav side-nav--animatable" :class="open ? 'side-nav--visible' : ''">
    <nav class="side-nav__container">
      <button class="side-nav__hide" @click="$emit('update:navOpened', false)"/>
      <header class="side-nav__header">Stellar Navigation</header>
      <div class="side-nav__content">
        <nuxt-link to="/" @click.native="$emit('update:navOpened', false)">All Songs</nuxt-link>
        <nuxt-link to="/create-song" @click.native="$emit('update:navOpened', false)">Create A Song</nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
};
</script>


<style lang="scss" scoped>
.side-nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 3;
  pointer-events: none;
}

.side-nav--visible {
  pointer-events: auto;
}

.side-nav::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  will-change: opacity;
  transition: opacity 0.3s ease;
}

.side-nav__container {
  position: relative;
  width: 90%;
  max-width: rem(400px);
  background: #fff;
  height: 100%;
  box-shadow: rem(2px) 0 rem(12px) rgba(0, 0, 0, 0.4);
  transform: translateX(-102%);
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.side-nav--animatable .side-nav__container {
  transition: transform 0.13s ease;
}

.side-nav--visible.side-nav--animatable .side-nav__container {
  transition: transform 0.33s ease;
}

.side-nav--visible::before {
  opacity: 1;
}

.side-nav--visible .side-nav__container {
  transform: none;
}

.side-nav__hide {
  position: absolute;
  background-image: url('~assets/img/close.svg');
  background-size: cover;
  left: rem(16px);
  top: rem(16px);
  background-color: transparent;
  border: none;
  color: #fff;
  width: rem(24px);
  height: rem(24px);
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

.side-nav__header {
  height: rem(200px);
  background: var(--main-color);
  color: #fff;
  display: flex;
  padding: rem(16px);
  align-items: flex-end;
  font-size: rem(24px);
}

.side-nav__content {
  padding-top: rem(32px);
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.side-nav__content a {
  color: #000;
  height: rem(48px);
  line-height: rem(48px);
  padding: 0 rem(16px);
  text-decoration: none;

  &.nuxt-link-exact-active {
    background-color: var(--secondary-light);
    font-weight: 600;

    &:hover {
      background-color: var(--secondary-light);
    }
  }

  &:hover {
    background: var(--background);
  }
}
</style>
