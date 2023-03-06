<template>
  <tr>
    <td>
      {{ item.longname }}
    </td>
    <td>
      {{ item.shortname }}
    </td>
    <td>
      <RouterLink
        :to="{
          name: 'edit',
          params: { type, ID }
        }"
        >edit</RouterLink
      >
      <button>delete</button>
    </td>
  </tr>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  props: {
    item: Object,
    type: String,
    index: Number
  },
  components: { RouterLink },
  data() {
    return {
      ID: this.index
    };
  }
};
</script>

<style scoped></style>
