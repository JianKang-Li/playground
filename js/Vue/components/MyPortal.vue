<template>
  <div ref="div">
    <slot></slot>
  </div>
</template>
<script lang="js">
export default {
  props: ["to"],
  mounted() {
    const target = document.querySelector(this.to);
    const operation = this.$refs.div;
    target.appendChild(operation);
  },
};
</script>
