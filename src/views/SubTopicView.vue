<template>
  <RouterLink
    :to="{
      name: 'create',
      params: { type: 'subtopic' }
    }"
  >
    Create new</RouterLink
  >
  <TableMinor minor="subtopic" />
</template>
<script setup>
import { RouterLink } from "vue-router";
import TableMinor from "../components/TableMinor.vue";
</script>
