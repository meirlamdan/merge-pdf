<script setup>
import { ref } from "vue";
import { PDFDocument } from "pdf-lib";

import Dropzone from "./components/Dropzone.vue";
import Louder from "./components/Louder.vue";

const files = ref([]);
const errMsg = ref(null);
const loading = ref(false);
const pdfUrl = ref(null);

const getSelectedPages = (file, pdfLoad) => {
  if (!file.pages) {
    return pdfLoad.getPageIndices();
  }
  const pagesArray = [];
  file.pages.split(",").forEach((value) => {
    if (!value.includes("-")) {
      pagesArray.push(+value - 1);
    } else {
      const [start, end] = value.split("-").map((p) => +p - 1);
      pagesArray.push(
        ...[...Array(end - start).keys()].map((x) => x + start),
        end
      );
    }
  });
  return pagesArray;
};

const mergePdf = async () => {
  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  loading.value = true;
  try {
    const mergedPdf = await PDFDocument.create();
    for (const file of files.value) {
      const pdfAsArrayBuffer = await readFileAsync(file);
      const pdfLoad = await PDFDocument.load(pdfAsArrayBuffer);
      const copyPages = await mergedPdf.copyPages(
        pdfLoad,
        getSelectedPages(file, pdfLoad)
      );
      copyPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    const pdfBytes = await mergedPdf.save();
    const pdfFile = new Blob([pdfBytes], { type: "application/pdf" });
    pdfUrl.value = URL.createObjectURL(pdfFile);
  } catch (error) {
    errMsg.value = error.message;
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const download = () => {
  const a = document.createElement("a");
  a.href = pdfUrl.value;
  a.download = "merge-file.pdf";
  a.click();
  URL.revokeObjectURL(pdfUrl.value);
  pdfUrl.value = null;
  files.value = [];
};
</script>

<template>
  <div>
    <div>
      <Dropzone :files="files" accept=".pdf" />
    </div>
    <div class="instructions">
      <div>Instructions:</div>
      <ol>
        <li>Drag and drop your PDF files into the box above.</li>
        <li>
          You can select the pages you want to merge or split by entering the
          page numbers separated by commas. For example, 1,2,3-5,6 will select
          pages 1, 2, 3, 4, 5, and 6.
        </li>
        <li>You can drag and drop the files in the order you want.</li>
        <li>Click the Merge/Split button to merge/split the PDF file/s.</li>
        <li>
          Click the Download button to download the merged/split PDF file.
        </li>
      </ol>
    </div>
    <button class="merge" v-if="files.length" @click="mergePdf">
      <span v-if="files.length === 1">Split the selected file</span>
      <span v-else>Merge {{ files.length || "" }} selected files</span>
    </button>
    <div class="message">
      <Louder />
      <div v-if="errMsg" class="error">Error: {{ errMsg }}</div>
      <div v-if="pdfUrl">The file is ready !</div>
    </div>
    <div v-if="pdfUrl">
      <button class="download" @click="download">
        <DownloadIcon size="20" />
        <span>download</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.instructions {
  margin: 1rem 0;
  text-align: left;
}

.instructions div {
  font-weight: bold;
}

.merge {
  background: #727f80;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

.message {
  margin: 10px 0;
}

.error {
  color: #ff0000;
  font-size: 12;
}

.download {
  justify-content: center;
  background: #4f9b4c;
  font-size: 1.1rem;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
