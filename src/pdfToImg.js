import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";

export default async function pdfToImg(pdfFile) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(pdfFile);
  const data = await new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result);
    };
  });
  const pdfData = new Uint8Array(data);

  //set Worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const pdf = await pdfjsLib.getDocument(pdfData).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 0.5 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  await page.render(renderContext).promise;
  return canvas.toDataURL();
}