<script setup>
import { ref } from "vue";
import { useDropzone } from "vue3-dropzone";
import draggable from "vuedraggable";

import File from "./File.vue";

const props = defineProps(["accept", "files"]);
const dragDisabled = ref(false);

function onDrop(acceptFiles, rejectReasons) {
  props.files.push(...acceptFiles);
  rejectReasons.length && console.log(rejectReasons);
}
const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(
  {
    onDrop,
    accept: props.accept,
  }
);
const deleteFile = (file) => {
  props.files.splice(props.files.indexOf(file), 1);
};
</script>

<template>
  <div class="dropzone">
    <div
      v-bind="getRootProps()"
      class="files"
      :class="{ 'drag-active': isDragActive, 'drag-reject': isDragReject }"
    >
      <input v-bind="getInputProps()" />
      <div>
        <draggable
          :list="files"
          class="file-view"
          item-key="name"
          ghostClass="ghost"
          dragClass="drag"
          chosenClass="chosen"
          :disabled="dragDisabled"
        >
          <template #item="{ element }">
            <File
              :file="element"
              @deleteFile="deleteFile"
              @inputFocus="dragDisabled = true"
              @inputBlur="dragDisabled = false"
              @click.stop=""
            >
            </File>
          </template>
        </draggable>
      </div>
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
    </div>
  </div>
</template>

<style>
.files {
  background: #fafafa;
  border: 1px dashed #000;
  border-radius: 5px;
}

.file-view {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: flex-start;
}

.drag-active {
  border: 2px dashed #000;
}

.drag-reject {
  border: 2px dashed #ff0000;
}

.ghost {
  background: gray;
  opacity: 0.5;
}

.drag {
  background: rgb(183, 196, 241);
  opacity: 0.5;
}
</style>
