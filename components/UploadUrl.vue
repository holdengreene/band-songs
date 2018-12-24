<template>
  <div>
    <input class="song-url" type="text" @change="updateUrl()" v-model="uploadUrl.url" :readonly="uploadUrl.isEditing ? false : true">
  </div>
</template>

<script>
export default {
  props: {
    uploadUrl: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    updateUrl: function() {
      return this.$emit('update:url', this.uploadUrl.url);
    }
  }
};
</script>

<style lang="scss" scoped>
.song-url {
  margin: rem(10px) 0;
}
</style>

