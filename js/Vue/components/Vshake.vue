<template>
  <div :class="{ Vshake: shake }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["shake"],
};
</script>

<style>
@keyframes shake2 {
  10%,
  90% {
    transform: translateX(-1px);
  }

  20%,
  80% {
    transform: translateX(2px);
  }

  30%,
  50%,
  70% {
    transform: translateX(-4px);
  }

  40%,
  60% {
    transform: translateX(4px);
  }
}

.Vshake {
  animation: shake2 1s;
}
</style>
