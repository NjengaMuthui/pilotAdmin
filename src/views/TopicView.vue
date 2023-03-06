<template>
  <RouterLink
    :to="{
      name: 'create',
      params: { type: 'topic' }
    }"
  >
    Create new</RouterLink
  >
  <TableMinor minor="topic" />
</template>
<script setup>
import { RouterLink } from "vue-router";
import TableMinor from "../components/TableMinor.vue";
</script>
