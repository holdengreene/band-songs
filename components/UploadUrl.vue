<template>
  <div>
    <input type="text" @change="updateUrl()" v-model="uploadUrl.url">
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

