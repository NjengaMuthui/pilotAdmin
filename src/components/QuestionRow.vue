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
    <td v-for="category in dataStore.categories">
      {{ Q[category] }}
    </td>
    <td>
      <!-- params: { index }-->
      <RouterLink
        :to="{
          name: 'editquestion',
          params: { ID, Table }
        }"
      >
        Edit
      </RouterLink>
      <button class="move" @click="moveQuestion">
        <div v-if="loading" class="loader"></div>
        <span v-else>To {{ moveToTable }}</span>
      </button>
      <button class="delete">delete</button>
    </td>
    <td></td>
  </tr>
</template>

<script>
import { RouterLink } from "vue-router";
import { useDataStore } from "../stores/counter";

export default {
  setup() {
    let dataStore = useDataStore();
    return { dataStore };
  },
  props: {
    Q: Object,
    index: Number,
    table: String
  },
  data() {
    return {
      ID: this.index,
      Table: this.table,
      loading: false
    };
  },
  methods: {
    async moveQuestion() {
      let data = this.Q;
      data["table"] = this.table;
      this.loading = true;
      let res = await this.dataStore.moveQuestion(data);
      if (res.data.result_insert == "success") {
        console.log("Removed");
        this.dataStore.removeQuestion(this.index);
      } else {
        console.log("Not Removed");
      }
      this.loading = false;
    }
  },
  computed: {
    moveToTable() {
      return this.Table == "questions" ? "reserve" : "questions";
    }
  }
};
</script>

<style scoped>
.loader {
  display: flex;
  margin-left: 45%;
  width: 20px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
.delete {
  color: #fff;
  background-color: crimson;
  width: 100%;
}
.move {
  color: #fff;
  background-color: rgb(73, 20, 220);
  width: 100%;
  margin-bottom: 2px;
  padding: 5px 0;
}
</style>
