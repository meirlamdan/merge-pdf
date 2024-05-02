<script setup>
import { mdiGithub } from "@mdi/js";

import Merge from "./Merge.vue";
</script>

<template>
  <div>
    <header>
      <a href="https://github.com/meirlamdan/merge-pdf">
        <Icon :path="mdiGithub" color="black" />
      </a>

      <h2>Merge and split pdf files</h2>
    </header>
    <main>
      <Merge />
    </main>
    <footer>
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
}

header {
  position: relative;
  background: #e2e8f0;
  padding: 0.8rem;
}

header a {
  position: absolute;
  right: 50px;
  top: 35px;
}

main {
  max-width: 1000px;
  min-height: 500px;
  margin: 0 auto;
  padding: 2rem 0 70px 0;
}
</style>
