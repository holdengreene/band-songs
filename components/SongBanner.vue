<template>
  <div class="song-banner">
    <div class="info editing" v-if="songState.isEditing">
      <p>You are currently editing.</p>
    </div>

    <div class="info updated" v-if="songState.isUpdated">
      <p>This song has been updated.</p>
    </div>

    <div class="info error" v-if="songState.isError">
      <p>There was an error. Please refresh and try again. Helpful I know.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songState: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.song-banner {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }
}

.info {
  position: relative;
  padding: rem(20px);
  width: 50%;
  text-align: center;
  font-size: rem(20px);
  border-radius: rem(3px);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
  }
}

.editing::after {
  background-color: var(--main-light);
}

.updated::after {
  background-color: var(--success);
}

.error::after {
  background-color: var(--warning);
}
</style>

