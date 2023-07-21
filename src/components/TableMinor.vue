<template>
  <div>
    <h1>{{ minor.toUpperCase() }}</h1>
    <button @click="testStore">Call Function</button>
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>Short name</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <MinorComponent
          v-for="(topic, index) in topicArray"
          :item="topic"
          :type="minor"
          :key="topic.ID"
          :index="index"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { useDataStore } from "../stores/counter";
import MinorComponent from "./MinorComponent.vue";

export default {
  setup() {
    let dataStore = useDataStore();
    return { dataStore };
  },
  computed: {
    topicArray() {
      return this.dataStore.$state[this.minor];
    }
  },
  methods: {
    testStore() {
      this.dataStore.test(this.minor);
    }
  },
  components: { MinorComponent },
  props: { minor: String }
};
</script>

<style scoped></style>
