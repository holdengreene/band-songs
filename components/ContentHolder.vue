<template>
  <div class="content-holder">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.content-holder {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: rem(10px);
  border-radius: rem(3px);
  box-shadow: 0 rem(1px) rem(3px) rgba(0, 0, 0, 0.12),
    0 rem(1px) rem(2px) rgba(0, 0, 0, 0.24);
}
</style>
