<script setup>
import { mdiFilePdfBox } from "@mdi/js";

const props = defineProps(["file"]);
</script>

<template>
  <div class="file">
    <span class="delete-file" @click.stop="$emit('deleteFile', file)">✖</span>
    <div class="icon"><Icon :path="mdiFilePdfBox" /></div>
    <div>
      <input
        class="pages"
        type="text"
        v-model="file.pages"
        placeholder="chose pages"
        @focus="$emit('inputFocus')"
        @blur="$emit('inputBlur')"
      />
      {{ file.pages }}
    </div>
    <div class="name">{{ file.name }}</div>
  </div>
</template>

<style scoped>
.file {
  height: 150px;
  width: 120px;
  border: 1px solid #000;
  border-radius: 5px;
  position: relative;
  margin: 5px;
}
.delete-file {
  position: absolute;
  top: 2px;
  right: 2px;
}
.name {
  width: 100%;
  position: absolute;
  bottom: 2px;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 2px;
}
.icon {
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
}

.icon span {
  font-size: 20px;
  font-weight: bold;
}

.pages {
  width: 85%;
  height: 10px;
  margin: 0 auto;
  border: 0.5px solid #000;
  border-radius: 3px;
  padding: 4px;
}
</style>
