<script setup>
import { mdiGithub } from "@mdi/js";

import Merge from "./Merge.vue";
</script>

<template>
  <div>
    <header>
      <div class="header">
        <h2>Merge and split pdf files</h2>
      </div>
    </header>
    <main>
      <Merge />
    </main>
    <footer>
      <div>
        <a href="https://github.com/meirlamdan/merge-pdf">
          <Icon :path="mdiGithub" color="black" />
        </a>
      </div>
    </footer>
  </div>
</template>

<style>
#app {
  text-align: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: normal;
  box-sizing: border-box;
  background: #f1f5f9;
  color: #374151;
  min-height: 100vh;
  padding-bottom: 50px;
  position: relative;
}

.header {
  background: #e2e8f0;
  padding: 0.8rem;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 10px;
}

footer {
  background: #e2e8f0;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

footer a:hover {
  opacity: 0.6;
}
</style>
