<template>
  <div class="edit">
    <div class="loading-div" :class="{ show: loading, hide: !loading }">
      <img src="../assets/round.gif" alt="Loading..." />
      <p>Loading data...</p>
    </div>
    <FormKit type="form" @submit="getQuestion" :value="Question">
      <FormKit type="textarea" label="detail" rows="4" name="question" />

      <FormKit type="textarea" rows="3" label="Answer" name="answer" />
      <FormKit type="textarea" rows="3" label="Choice One" name="choiceone" />
      <FormKit type="textarea" rows="3" label="Choice Two" name="choicetwo" />
      <FormKit
        type="textarea"
        rows="3"
        label="Choice Three"
        name="choicethree"
      />

      <FormKit
        v-for="(category, index) in dataStore.categories"
        type="select"
        :label="category"
        :name="category"
        :options="
          dataStore.getOptionArray(category, Question.category[index].ID)
        "
      />
    </FormKit>
  </div>
</template>

<script>
import { useDataStore } from "../stores/counter";
export default {
  data() {
    return {
      loading: false
    };
  },
  setup() {
    let dataStore = useDataStore();
    return { dataStore };
  },
  computed: {
    Question() {
      return this.dataStore.questions[this.$route.params.ID];
    }
  },
  methods: {
    async getQuestion(data) {
      this.loading = true;
      let res = await this.dataStore.editQuestion(data, this.$route.params.ID);
      console.log(res);
      this.loading = false;
    }
  }
};
</script>
