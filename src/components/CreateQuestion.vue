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

<script setup>
import { ref } from "vue";
import { useDataStore } from "../stores/counter";
import axios from "axios";

// Initialize the state and store
const loading = ref(false);
const dataStore = useDataStore();
const selectedFile = ref(null);
const showImage = ref(false);
const port = window.location.port === "" ? "" : `:${window.location.port}`;
const attachment = ref(
  `${window.location.protocol}//${window.location.hostname}${port}/src/assets/missing.png`
);

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  attachment.value = URL.createObjectURL(event.target.files[0]);
};
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

// Define the method to get and create a question
const getQuestion = async (data) => {
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
  await dataStore.createQuestion(data);
  console.log(data);
  loading.value = false;
};
</script>

<style scoped>
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
