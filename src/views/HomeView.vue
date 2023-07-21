<script>
import QuestionRow from "../components/QuestionRow.vue";
import { useDataStore } from "../stores/counter";
import { RouterLink } from "vue-router";
export default {
  components: { QuestionRow },
  data() {
    return {
      ncategory: "",
      showInput: false
    };
  },
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
  },
  methods: {
    async deleteColumn(category) {
      let obj = {
        operation: 1,
        name: category
      };
      let res = await this.dataStore.modifyCategory(obj);
      console.log(res);
    },
    async createColumn() {
      let obj = {
        operation: 0,
        name: this.ncategory
      };
      let res = await this.dataStore.modifyCategory(obj);
      console.log(res);
    }
  }
};
</script>

<template>
  <main>
    <div class="top">
      <RouterLink to="/createquestion">Create New</RouterLink>
      <button class="create" @click="showInput = !showInput">
        add category
      </button>
    </div>
    <div class="hidden-input" :class="{ show_input: showInput }">
      <FormKit
        type="text"
        v-model="ncategory"
        placeholder="New Category"
        validation="required"
        v-on:keyup.enter="createColumn"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th>Details</th>
          <th>Answer</th>
          <th>Choice one</th>
          <th>Choice two</th>
          <th>Choice Three</th>
          <th v-for="category in dataStore.categories">
            <button class="delete" @click="deleteColumn(category)">
              Delete
            </button>
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
.delete {
  opacity: 0.1;
  transition: opacity 0.3s ease-in;
}
.delete:hover {
  opacity: 1;
}
.top,
.hidden-input {
  width: 80%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.hidden-input {
  justify-content: end;
  height: 0;
  transition: height 0.3s ease-out;
}
.show_input {
  height: 42px;
}
</style>
