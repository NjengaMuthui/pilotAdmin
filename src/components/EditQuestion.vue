<template>
  <div v-if="!showImage" class="edit">
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
    <FormKit
      type="form"
      v-if="!loading"
      @submit="getQuestion"
      :value="Question"
    >
      <FormKit type="textarea" label="Question" rows="4" name="question" />
      <FormKit type="textarea" rows="3" label="Answer" name="answer" />
      <FormKit type="textarea" rows="3" label="Choice One" name="choiceone" />
      <FormKit type="textarea" rows="3" label="Choice Two" name="choicetwo" />
      <FormKit
        type="textarea"
        rows="3"
        label="Choice Three"
        name="choicethree"
      />
      <div class="attachment">
        <label for="attachment">Attachment</label>
        <div class="attachment-row">
          <div class="image" @click="showImage = true">
            <img :src="attachment" alt="Attachment Image" />
          </div>
          <input type="file" v-on:change="onFileChange" id="attachment" />
        </div>
        <!--<div class="upload-button" @click="uploadImage">upload</div> -->
      </div>
      <FormKit
        type="select"
        label="Level"
        name="level"
        :options="dataStore.levels"
      />
      <FormKit
        type="select"
        label="Subject"
        name="subject"
        :options="dataStore.subjects"
      />

      <FormKit
        v-for="category in dataStore.categories"
        type="text"
        :label="category"
        :name="category"
      />
    </FormKit>
  </div>
  <div v-else class="image-viewer">
    <img :src="attachment" alt="Large Image" />
    <div class="close-button" @click="showImage = false">
      <FontAwesomeIcon icon="circle-xmark" />
      Close
    </div>
  </div>
</template>
<style>
.upload-button {
  background-color: var(--zafre);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  padding: 8px 0;
  color: var(--color-heading);
}
.upload-button {
  font-size: 20px;
}
.close-button {
  position: absolute;
  top: 5%;
  left: 5%;
  display: flex;
  color: var(--incorrect-answer);
  align-items: center;
  font-size: 20px;
  gap: 10px;
  cursor: pointer;
  font-weight: 600;
  background-color: #11111151;
  padding: 5px;
}
.close-button svg {
  font-size: 40px;
}
.image {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.image img {
  width: 100%;
  height: 100%;
}
.attachment-row {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.attachment {
  display: flex;
  flex-direction: column;
}
.formkit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.edit {
  margin-bottom: 40px;
}
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
.image-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
  background-color: #f0f0f0; /* Light gray background */
  position: relative;
}

.image-viewer img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensures the image scales properly */
}
.loader {
  display: flex;
  margin-left: 45%;
  width: 30px;
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
.info {
  color: crimson;
}
</style>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useDataStore } from "../stores/counter";
import axios from "axios";

// Access the route object to get parameters
const route = useRoute();
const dataStore = useDataStore();

// Reactive properties
const loading = ref(false);
const selectedFile = ref(null);
const showImage = ref(false);

// Computed property for question
const Question = computed(() => dataStore.questions[route.params.ID]);

// Computed property for attachment
const port = window.location.port === "" ? "" : `:${window.location.port}`;
function setDefault() {
  if (
    Question.value.attachment === null ||
    Question.value.attachment === "null"
  ) {
    return `${window.location.protocol}//${window.location.hostname}${port}/src/assets/missing.png`;
  } else {
    return Question.value.attachment;
  }
}
const attachment = ref(setDefault());

// Method to handle file selection
const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  attachment.value = URL.createObjectURL(event.target.files[0]);
};

// Method to handle the editing of a question
async function uploadImage() {
  const formData = new FormData();
  formData.append("file", selectedFile.value);
  let response = null;
  try {
    response = await axios.post("image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  } catch (error) {
    alert("File upload failed");
    response = {
      data: {
        uploadOk: 0
      }
    };
  }
  return response.data;
}
const getQuestion = async (data) => {
  data["table"] = route.params.Table;
  loading.value = true;
  if (selectedFile.value !== null) {
    const upload = await uploadImage();
    console.log(upload);
    if (upload.uploadOk === 0) {
      loading.value = false;
      return;
    }
    data.attachment = upload.fileName;
  }

  const res = await dataStore.editQuestion(data, route.params.ID);
  loading.value = false;

  let msg = "";
  if (res.data.result === "success") {
    msg = "Question Edited successfully";
    Object.keys(Question.value).forEach((key) => {
      Question.value[key] = data[key];
    });
  } else {
    msg = res.data.error;
  }
  alert(msg);
};
</script>
