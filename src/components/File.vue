<script setup>
import { onMounted, ref } from "vue";

import pdfImg from '../pdfToImg.js'

const props = defineProps(["file"]);
const src = ref(null);

onMounted(async () => {
  src.value = await pdfImg(props.file);
});
</script>

<template>
  <div class="file">
    <div class="file-view">
      <img :src alt="" v-if="src">
      <span class="delete-file" @click.stop="$emit('deleteFile', file)">✖</span>
      <div class="select-pages">
        <input type="text" v-model="file.pages" placeholder="Select Pages" @focus="$emit('inputFocus')"
          @blur="$emit('inputBlur')" />
        {{ file.pages }}
      </div>
    </div>
    <div class="name">{{ file.name }}</div>
  </div>
</template>

<style scoped>
.file {
  margin: 10px;
  width: 150px;
  background: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.file-view {
  height: 180px;
  padding: 7px 7px 0 7px;
  position: relative;
}

img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
}

.delete-file {
  position: absolute;
  top: 5px;
  right: 8px;
  cursor: pointer;
}

.select-pages {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  font-size: 10px;
}

.name {
  width: 80%;
  margin: auto;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 2px;
}

input {
  width: 80%;
  height: 10px;
  margin: 0 auto;
  border: 0.5px solid #e5e7eb;
  border-radius: 3px;
  padding: 4px;
}

input:focus {
  outline: none;
}
</style>
