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
      return this.dataStore.$state[this.$route.params.type][
        this.$route.params.ID
      ];
    }
  },
  methods: {
    getvalues(data) {
      data.type = this.$route.params.type;
      this.dataStore.editMinorData(
        "/category/",
        this.$route.params.type,
        data,
        this.$route.params.ID
      );
    }
  }
};
</script>

<style scoped></style>
