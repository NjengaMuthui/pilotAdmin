<template>
  <div>
    <h1>Create New {{ $route.params.type }}</h1>
    <FormKit type="form" @submit="getvalues">
      <FormKit
        :label="$route.params.type + ' Full Name'"
        type="text"
        name="longname"
        validation="required"
      />
      <FormKit
        :label="$route.params.type + ' Short Name'"
        type="text"
        name="shortname"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script>
import { FormKit } from "@formkit/vue";
import { useDataStore } from "../stores/counter";

export default {
  setup() {
    let dataStore = useDataStore();
    return { dataStore };
  },
  components: { FormKit },
  methods: {
    async getvalues(data) {
      let res = await this.dataStore.postMinorData(
        this.$route.params.type,
        "/" + this.$route.params.type,
        data
      );
      console.log(res);
    }
  }
};
</script>

<style scoped></style>
