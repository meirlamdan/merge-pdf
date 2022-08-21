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
});
</script>

<template>
  <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
    <path :fill="color" :d="path" />
  </svg>
</template>
