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

export default {
  components: { FormKit },
  data() {
    return {
      values: null
    };
  },
  methods: {
    getvalues(data) {
      console.log(JSON.stringify(data));
    }
  }
};
</script>

<style scoped></style>
