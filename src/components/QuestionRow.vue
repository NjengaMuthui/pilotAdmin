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
    <td>{{ index }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    Q: Object,
    index: Number
  }
};
</script>

<style scoped></style>
