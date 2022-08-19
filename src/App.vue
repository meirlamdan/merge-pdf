<script setup>
import Merge from "./Merge.vue";
</script>

<template>
  <div>
    <header>
      <h2>Merge and split pdf files</h2>
    </header>
    <main>
      <Merge />
    </main>
    <footer />
  </div>
</template>

<style>
#app {
  text-align: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: normal;
}

header,
footer {
  line-height: 1.5;
  background: rgb(213, 211, 211);
  padding: 1rem;
}

main {
  max-width: 1000px;
  min-height: 500px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
