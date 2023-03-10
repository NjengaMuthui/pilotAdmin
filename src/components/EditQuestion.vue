<template>
  <div>
    <FormKit type="form" :value="Question">
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
      <FormKit type="text" label="Topic" name="topic" />
      <FormKit type="text" label="Subtopic" name="subtopic" />
      <FormKit type="text" label="Unit" name="unit" />
    </FormKit>
  </div>
</template>

<script>
import { useDataStore } from "../stores/counter";
export default {
  setup() {
    let dataStore = useDataStore();
    return { dataStore };
  },
  computed: {
    Question() {
      return this.dataStore.questions[this.$route.params.ID];
    }
  }
};
</script>

<style scoped></style>
