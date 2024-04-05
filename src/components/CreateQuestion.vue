<template>
  <div class="edit">
    <div class="loading-div" v-if="loading">
      <div class="skeleton-form">
        <!-- Skeleton form group -->
        <div class="form-group">
          <label class="label"></label>
          <textarea class="text-area"></textarea>
        </div>

        <div class="form-group">
          <label class="label"></label>
          <textarea class="text-area"></textarea>
        </div>
        <div class="form-group">
          <label class="label"></label>
          <textarea class="text-area"></textarea>
        </div>
        <div class="form-group">
          <label class="label"></label>
          <textarea class="text-area"></textarea>
        </div>
        <div class="form-group">
          <label class="label"></label>
          <textarea class="text-area"></textarea>
        </div>
        <div class="form-group">
          <label class="label"></label>
          <textarea class="text-area"></textarea>
        </div>
      </div>
    </div>
    <FormKit v-if="!loading" type="form" @submit="getQuestion">
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
      <FormKit type="text" label="Level" name="level" />
      <FormKit type="text" label="Subject" name="subject" />

      <FormKit
        v-for="(category, index) in dataStore.categories"
        type="select"
        :label="category"
        :name="category"
        :options="dataStore.getOptionArray(category, 0)"
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
  methods: {
    async getQuestion(data) {
      this.loading = true;
      await this.dataStore.createQuestion(data);
      console.log(data);
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.skeleton-form {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #222;
  border-radius: 8px;
  color: #fff;
}

.skeleton-form .form-group {
  margin-bottom: 15px;
}

.skeleton-form .label {
  width: 100px;
  height: 20px;
  background: linear-gradient(90deg, #111 25%, #333 50%, #111 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: loading 1.5s infinite ease-in-out;
}

.skeleton-form .text-area {
  width: calc(100% - 100px);
  height: 20px;
  background: linear-gradient(90deg, #111 25%, #333 50%, #111 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: loading 1.5s infinite ease-in-out;
}

/* Keyframe animation for loading effect */
@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: -100% 50%;
  }
}
</style>
