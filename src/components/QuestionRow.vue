<template>
  <tr>
    <td>{{ Q.question }}</td>
    <td>{{ Q.answer }}</td>
    <td>{{ Q.choiceone }}</td>
    <td>{{ Q.chocetwo }}</td>
    <td>{{ Q.choicethree }}</td>
    <td>{{ Q.topic }}</td>
    <td>{{ Q.subtopic }}</td>
    <td>{{ Q.unit }}</td>
    <td>
      <!-- params: { index }-->
      <RouterLink
        :to="{
          name: 'editquestion',
          params: { ID }
        }"
      >
        Edit
        {{ index }}
      </RouterLink>
      <button>delete</button>
    </td>
    <td></td>
  </tr>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  props: {
    Q: Object,
    index: Number
  },
  data() {
    return {
      ID: this.index
    };
  }
};
</script>

<style scoped></style>
