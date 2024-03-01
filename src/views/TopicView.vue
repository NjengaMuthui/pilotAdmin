<template>
  <RouterLink
    :to="{
      name: 'create',
      params: { type: this.$route.params.type }
    }"
  >
    Create new</RouterLink
  >
  <TableMinor :minor="this.$route.params.type" />
</template>
<script setup>
import { RouterLink } from "vue-router";
import TableMinor from "../components/TableMinor.vue";
</script>
