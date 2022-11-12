<script setup>
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  size: {
    type: String,
    default: 24,
  },
});
</script>

<template>
  <svg :style="{width: `${size}px`, height: `${size}px`}" viewBox="0 0 24 24">
    <path :fill="color" :d="path" />
  </svg>
</template>
