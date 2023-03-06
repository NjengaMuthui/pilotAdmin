<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/topic">Topic</RouterLink>
    <RouterLink to="/subtopic">Subtopic</RouterLink>
    <RouterLink to="/unit">Unit</RouterLink>
  </nav>
  <div class="b">
    <RouterView />
  </div>
</template>

<style scoped>
.b {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

nav {
  position: fixed;
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 1rem 0;
  z-index: 1;
  border-bottom: 1px solid var(--color-text);
  background-color: var(--color-background);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
