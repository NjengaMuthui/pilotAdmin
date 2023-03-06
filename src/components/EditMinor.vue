<template>
  <div>
    <FormKit type="form" @submit="getvalues" :value="topic">
      <FormKit
        label="Full Name"
        type="text"
        name="longname"
        validation="required"
      />
      <FormKit
        label="Short Name"
        type="text"
        name="shortname"
        validation="required"
      />
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
    topic() {
      switch (this.$route.params.type) {
        case "topic":
        default:
          return this.dataStore.topics[this.$route.params.ID];
        case "subtopic":
          return this.dataStore.subtopics[this.$route.params.ID];
        case "unit":
          return this.dataStore.units[this.$route.params.ID];
      }
    }
  },
  methods: {
    getvalues(data) {
      console.log(JSON.stringify(data));
    }
  }
};
</script>

<style scoped></style>
