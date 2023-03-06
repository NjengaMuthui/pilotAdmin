<template>
  <RouterLink
    :to="{
      name: 'create',
      params: { type: 'unit' }
    }"
  >
    Create new</RouterLink
  >
  <TableMinor minor="unit" />
</template>
<script setup>
import { RouterLink } from "vue-router";
import TableMinor from "../components/TableMinor.vue";
</script>
