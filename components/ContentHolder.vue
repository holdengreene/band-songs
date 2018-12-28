<template>
  <div class="content-holder">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.content-holder {
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: #fff;
  padding: rem(10px);
  margin-top: rem(50px);
  border-radius: rem(3px);
  box-shadow: $box-shadow;
  z-index: 1;
}
</style>
