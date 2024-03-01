<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import QuestionRow from "../components/QuestionRow.vue";
import { useDataStore } from "../stores/counter";
import { RouterLink } from "vue-router";
import { computed, onMounted, ref } from "vue";

const ncategory = ref("");
const showInput = ref(false);
const itemsPerPage = ref(10);

const uuid = ref(true);
const question = ref(true);
const answer = ref(true);
const choiceOne = ref(true);
const choiceTwo = ref(true);
const choiceThree = ref(true);
const level = ref(true);
const subject = ref(true);

const dataStore = useDataStore();

const totalPages = computed(() =>
  Math.ceil(dataStore.questionsTotalCount / itemsPerPage.value)
);
const pageSize = 10;

const currentPage = ref(dataStore.currentPage);
let currentSet = ref(dataStore.currentSet);
const totalSets = computed(() => Math.ceil(totalPages.value / pageSize));

const visiblePageNumbers = computed(() => {
  const startPage = (currentSet.value - 1) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages.value);
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});
const searchText = ref("");

const search = async () => {
  let obj = { start: (dataStore.currentPage - 1) * 10 };
  if (uuid.value) obj["uuid"] = searchText.value;
  if (question.value) obj["question"] = searchText.value;
  if (answer.value) obj["answer"] = searchText.value;
  if (choiceOne.value) obj["choiceOne"] = searchText.value;
  if (choiceTwo.value) obj["choiceTwo"] = searchText.value;
  if (choiceThree.value) obj["choiceThree"] = searchText.value;
  if (level.value) obj["level"] = searchText.value;
  if (subject.value) obj["subject"] = searchText.value;

  await dataStore.getQuestionsCount(obj);

  await dataStore.getQuestions(obj);
  dataStore.categories.forEach((element) => {
    dataStore.getData(element);
  });
};
const reset = () => {
  currentPage.value = dataStore.currentPage = 1;
};
const searchReset = async () => {
  reset();
  await search();
};
const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    dataStore.currentPage = page;
    await getPageData(page);
  }
};
const clearSearch = async () => {
  searchText.value = "";
  reset();
  await fetchData();
};

const prevSet = () => {
  if (currentSet.value > 1) {
    currentSet.value--;
    dataStore.currentSet = currentSet.value;
  }
};

const nextSet = () => {
  if (currentSet.value < totalSets.value) {
    currentSet.value++;
    dataStore.currentSet = currentSet.value;
  }
};

const deleteColumn = async (category) => {
  const obj = {
    operation: 1,
    name: category,
  };
  const res = await dataStore.modifyCategory(obj);
  console.log(res);
};

const createColumn = async () => {
  const obj = {
    operation: 0,
    name: state.ncategory,
  };
  const res = await dataStore.modifyCategory(obj);
  console.log(res);
};

const fetchData = async () => {
  let obj = { start: (dataStore.currentPage - 1) * 10 };
  await dataStore.getCategories();
  await dataStore.getQuestionsCount(obj);
  await dataStore.getQuestions(obj);
  dataStore.categories.forEach((element) => {
    dataStore.getData(element);
  });
};
const getPageData = async (pageNumber) => {
  let obj = {
    start: (pageNumber - 1) * pageSize,
  };
  if (searchText.value.length > 0) {
    if (uuid.value) obj["uuid"] = searchText.value;
    if (question.value) obj["question"] = searchText.value;
    if (answer.value) obj["answer"] = searchText.value;
    if (choiceOne.value) obj["choiceOne"] = searchText.value;
    if (choiceTwo.value) obj["choiceTwo"] = searchText.value;
    if (choiceThree.value) obj["choiceThree"] = searchText.value;
    if (level.value) obj["level"] = searchText.value;
    if (subject.value) obj["subject"] = searchText.value;
  }

  await dataStore.getQuestions(obj);
};

onMounted(fetchData);
</script>

<template>
  <main>
    <div class="top">
      <RouterLink to="/createquestion">Create New</RouterLink>
      <button class="create" @click="showInput = !showInput">
        add category
      </button>
    </div>

    <div class="hidden-input" :class="{ show_input: showInput }">
      <FormKit
        type="text"
        v-model="ncategory"
        placeholder="New Category"
        validation="required"
        v-on:keyup.enter="createColumn"
      />
    </div>
    <div class="search-container">
      <input
        type="text"
        v-model="searchText"
        class="search-input"
        placeholder="Search..."
        @keypress.enter="searchReset"
      />
      <button @click="clearSearch" class="clear-button">
        <FontAwesomeIcon icon="circle-xmark" />
      </button>
    </div>
    <div class="hide-show-columns">
      <div class="check-label">
        <input type="checkbox" v-model="uuid" id="uuid" />
        <label for="uuid">uuid</label>
      </div>

      <div class="check-label">
        <input type="checkbox" v-model="question" id="Question" />
        <label for="Question">Question</label>
      </div>
      <div class="check-label">
        <input type="checkbox" v-model="answer" id="Answer" />
        <label for="Answer">Answer</label>
      </div>
      <div class="check-label">
        <input type="checkbox" v-model="choiceOne" id="Choice One" />
        <label for="Choice One">Choice One</label>
      </div>
      <div class="check-label">
        <input type="checkbox" v-model="choiceTwo" id="Choice Two" />
        <label for="Choice Two">Choice Two</label>
      </div>
      <div class="check-label">
        <input type="checkbox" v-model="choiceThree" id="Choice Three" />
        <label for="Choice Three">Choice Three</label>
      </div>
      <div class="check-label">
        <input type="checkbox" v-model="level" id="Level" />
        <label for="Level">Level</label>
      </div>

      <div class="check-label">
        <input type="checkbox" v-model="subject" id="Subject" />
        <label for="Subject">Subject</label>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>UUID</th>
          <th>Details</th>
          <th>Answer</th>
          <th>Choice one</th>
          <th>Choice two</th>
          <th>Choice Three</th>
          <th>level</th>
          <th>Subject</th>
          <th v-for="category in dataStore.categories">
            <button class="delete" @click="deleteColumn(category)">
              Delete
            </button>
            {{ category }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <QuestionRow
          v-for="(question, index) in dataStore.questions"
          :key="question.ID"
          :Q="question"
          :index="index"
        />
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevSet" :disabled="currentSet === 1" class="nav">
        <FontAwesomeIcon icon="angles-left" />
      </button>
      <button class="nav"><FontAwesomeIcon icon="angle-left" /></button>

      <button
        v-for="pageNumber in visiblePageNumbers"
        :key="pageNumber"
        @click="goToPage(pageNumber)"
        class="nav"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </button>

      <button class="nav"><FontAwesomeIcon icon="angle-right" /></button>
      <button @click="nextSet" :disabled="currentSet === totalSets" class="nav">
        <FontAwesomeIcon icon="angles-right" />
      </button>
    </div>
    <div class="info">
      <p>
        Page no.<strong>{{ currentPage }}</strong> of
        <strong>{{ totalPages }}</strong>
      </p>
      <p>
        Total Number Of Questions is
        <strong>{{ dataStore.questionsTotalCount }}</strong>
      </p>
    </div>
  </main>
</template>
<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  gap: 20px;
}
.nav {
  color: #fff;
  background-color: #181818;
  border: #181818 2px solid;
}
.nav:hover {
  border: #fff 2px solid;
}
.active {
  border: #fff 2px solid;
}
table {
  width: 95%;
  margin: auto;
  border-collapse: collapse;
}
td {
  padding: 5px;
}
tr {
  border-bottom: 1px solid var(--color-border);
}
.delete {
  opacity: 0.1;
  transition: opacity 0.3s ease-in;
}
.delete:hover {
  opacity: 1;
}
.top,
.hidden-input {
  width: 80%;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.hidden-input {
  justify-content: end;
  height: 0;
  transition: height 0.3s ease-out;
}
.show_input {
  height: 42px;
}
.pagination {
  margin: 30px;
  display: flex;
  justify-content: center;
}
.hide-show-columns {
  display: flex;
  gap: 15px;
  margin: 8px 0 8px 5%;
}
.check-label label {
  margin-left: 5px;
}
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 5%;
  max-width: 250px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.clear-button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
}
</style>
