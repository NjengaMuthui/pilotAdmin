<template>
  <tr>
    <td>{{ Q.uuid }}</td>
    <td>{{ Q.question }}</td>
    <td>{{ Q.answer }}</td>
    <td>{{ Q.choiceone }}</td>
    <td>{{ Q.choicetwo }}</td>
    <td>{{ Q.choicethree }}</td>
    <td>{{ Q.level }}</td>
    <td>{{ Q.subject }}</td>
    <td v-for="(cat, index) in Q.category">
      {{ cat.longname }}
    </td>
    <td>
      <!-- params: { index }-->
      <RouterLink
        :to="{
          name: 'editquestion',
          params: { ID }
        }"
      >
        Edit
      </RouterLink>
      <button class="delete">delete</button>
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

<style scoped>
.delete{
  color: #fff;
  background-color: crimson;
  margin-top: 5px;
}
</style>
