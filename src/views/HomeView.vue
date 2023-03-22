<script>
import QuestionRow from "../components/QuestionRow.vue";
import { useDataStore } from "../stores/counter";
import { RouterLink } from "vue-router";
export default {
  components: { QuestionRow },
  setup() {
    let dataStore = useDataStore();
    return { dataStore };
  },
  async mounted() {
    await this.dataStore.getCategories();
    await this.dataStore.getQuestions();
    this.dataStore.categories.forEach((element) => {
      this.dataStore.getData(element);
    });
  }
};
</script>

<template>
  <main>
    <RouterLink to="/create/question">Create New</RouterLink>

    <table>
      <thead>
        <tr>
          <th>Details</th>
          <th>Answer</th>
          <th>Choice one</th>
          <th>Choice two</th>
          <th>Choice Three</th>
          <th v-for="(category, index) in dataStore.categories">
            {{ category }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <QuestionRow
          v-for="(question, index) in dataStore.questions"
          :key="question.ID"
          :Q="question"
          :index="index"
        />
      </tbody>
    </table>
  </main>
</template>
<style scoped>
table {
  width: 80%;
  margin: auto;
  border-collapse: collapse;
}
tr {
  border-bottom: 1px solid var(--color-border);
}
</style>
