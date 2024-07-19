<template>
  <div class="container">
    <h1>Please Login</h1>

    <WavyLabelInput
      Type="text"
      Label="Username"
      v-model="username"
      :Required="true"
      :errorMessage="usernameError"
      :validator="validateName"
    />
    <div class="password-container">
      <div class="text-container">
        <WavyLabelInput
          v-if="showPassword"
          Type="password"
          Label="Password"
          v-model="password"
          :Required="true"
          @keyup.enter="login"
        />
        <WavyLabelInput
          v-else
          Type="text"
          Label="Password"
          v-model="password"
          :Required="true"
          @keyup.enter="login"
        />
      </div>
      <div @click="showPassword = !showPassword" class="eye">
        <font-awesome-icon v-if="showPassword" icon="fa-regular fa-eye-slash" />
        <font-awesome-icon v-else icon="fa-regular fa-eye" />
      </div>
    </div>

    <p class="info" v-if="incorrect">
      Incorrect Username and password combination
    </p>

    <button @click="login" class="btn">
      <div v-if="loading" class="loader"></div>
      <span v-else>Login</span>
    </button>
  </div>
</template>

<script setup>
import WavyLabelInput from "../components/WavyLabelInput.vue";
import { ref } from "vue";
import { useDataStore } from "../stores/counter";
import router from "../router";

let dataStore = useDataStore();

const username = ref("");
const usernameError = ref("Too short");
const password = ref("");
const incorrect = ref(false);
const loading = ref(false);
const showPassword = ref(false);

function validateName(value) {
  return value.length > 3;
}

async function login() {
  loading.value = true;
  let res = await dataStore.login({
    username: username.value,
    password: password.value
  });
  loading.value = false;
  if (res === "success") {
    dataStore.currentUser = username.value;
    router.push({ path: "/" });
  } else {
    incorrect.value = true;
  }
}
</script>

<style scoped>
.password-container {
  display: flex;
}
.text-container,
.eye {
  display: flex;
  flex-direction: column;
}
.eye {
  margin-left: 10px;
  justify-content: center;
  align-items: center;
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
.container {
  background-color: var(--color-background);
  padding: 20px 40px;
  border-radius: 5px;
  width: 350px;
  margin: 40px auto 0 auto;
  color: var(--color-heading);
  box-shadow: var(--color-heading);
}

.container h1 {
  text-align: center;
  margin-bottom: 25px;
}

.container a {
  text-decoration: none;
  color: lightblue;
}

.btn {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: lightblue;
  padding: 15px;
  font-family: inherit;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.text {
  margin-top: 30px;
}
</style>
