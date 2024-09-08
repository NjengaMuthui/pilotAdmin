<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import QuestionRow from "../components/QuestionRow.vue";
import { useDataStore } from "../stores/counter";
import { RouterLink } from "vue-router";
import { computed, onBeforeMount, watch, onMounted, ref } from "vue";
import router from "../router";

const dataStore = useDataStore();

onBeforeMount(() => {
  if (dataStore.currentUser.length === 0) router.push({ name: "Login" });
});

const ncategory = ref("");
const showInput = ref(false);
const itemsPerPage = ref(10);
const Loading = ref(false);
const allSelect = ref(true);

watch(
  dataStore.columns,
  (newColumns) => {
    if (newColumns.some((column) => column.value === false)) {
      allSelect.value = false;
    }
  },
  { deep: true }
);
watch(allSelect, (newVal) => {
  if (newVal) {
    dataStore.columns.forEach((column) => {
      column.value = true;
    });
  }
});

const totalPages = computed(() =>
  Math.ceil(dataStore.questionsReserveCount / itemsPerPage.value)
);
const pageSize = 10;

const currentPage = ref(dataStore.currentReservePage);
let currentSet = ref(dataStore.currentReserveSet);
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
  Loading.value = true;
  let obj = {
    table: "reserve",
    start: (dataStore.currentReservePage - 1) * 10
  };
  dataStore.columns.value.forEach((element) => {
    if (element.value) obj[element.db] = searchText.value;
  });

  await dataStore.getQuestionsCount(obj);

  await dataStore.getQuestions(obj);
  Loading.value = false;
};
const reset = () => {
  currentPage.value = dataStore.currentPage = 1;
};
const searchReset = async () => {
  reset();
  await search();
};
async function fetchCategories() {
  await dataStore.getCategories();
}
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
    name: category
  };
  const res = await dataStore.modifyCategory(obj);
  console.log(res);
};

const createColumn = async () => {
  const obj = {
    operation: 0,
    name: ncategory.value
  };
  const res = await dataStore.modifyCategory(obj);
  console.log(res);
};

const questions = ref("reserve");

const fetchData = async () => {
  Loading.value = true;
  let obj = {
    table: "reserve",
    start: (dataStore.currentReservePage - 1) * 10
  };
  await dataStore.getQuestionsCount(obj);
  await dataStore.getQuestions(obj);
  Loading.value = false;
};
const getPageData = async (pageNumber) => {
  Loading.value = true;
  let obj = {
    table: "reserve",
    start: (pageNumber - 1) * pageSize
  };
  dataStore.columns.forEach((element) => {
    if (element.value) obj[element.db] = searchText.value;
  });

  await dataStore.getQuestions(obj);
  Loading.value = false;
};

onMounted(async () => {
  await fetchCategories();
  await fetchData();
});
</script>

<template>
  <main>
    <div class="top">
      <RouterLink to="/createquestion">Create A New Question</RouterLink>
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
      <input class="check-label" type="checkbox" v-model="allSelect" id="all" />
      <label for="all">All</label>
      <div
        v-for="(column, index) in dataStore.columns"
        :key="index"
        class="check-label"
      >
        <input type="checkbox" v-model="column.value" :id="column.label" />
        <label :for="column.label">{{ column.label }}</label>
      </div>
    </div>
    <!-- Skeleton loader table structure -->
    <table v-if="Loading" class="skeleton-loader">
      <thead>
        <tr>
          <th>UUID</th>
          <th>Details</th>
          <th>Answer</th>
          <th>Choice one</th>
          <th>Choice two</th>
          <th>Choice Three</th>
          <th>level</th>
        </tr>
      </thead>
      <tbody>
        <!-- Skeleton row -->
        <tr class="skeleton-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="skeleton-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="skeleton-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="skeleton-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="skeleton-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="skeleton-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="skeleton-row">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table v-if="!Loading">
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
        <tr v-if="Loading">
          <td class="skeleton"></td>
          <td class="skeleton"></td>
          <td class="skeleton"></td>
          <td class="skeleton"></td>
          <td class="skeleton"></td>
          <td class="skeleton"></td>
          <td class="skeleton"></td>
          <td class="skeleton"></td>
        </tr>
        <QuestionRow
          v-for="(question, index) in dataStore.questions"
          :key="question.ID"
          :Q="question"
          :index="index"
          :table="questions"
        />
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevSet" :disabled="currentSet === 1" class="nav">
        <FontAwesomeIcon icon="angles-left" />
      </button>
      <button class="nav" @click="goToPage(currentPage - 1)">
        <FontAwesomeIcon icon="angle-left" />
      </button>

      <button
        v-for="pageNumber in visiblePageNumbers"
        :key="pageNumber"
        @click="goToPage(pageNumber)"
        class="nav"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </button>

      <button class="nav" @click="goToPage(currentPage + 1)">
        <FontAwesomeIcon icon="angle-right" />
      </button>
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
        <strong>{{ dataStore.questionsReserveCount }}</strong>
      </p>
    </div>
  </main>
</template>
<style scoped>
main {
  width: 100%;
}
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
.skeleton-loader {
  width: 100%;
  border-collapse: collapse;
}

.skeleton-loader th,
.skeleton-loader td {
  padding: 12px;
  height: 4rem;
  border-bottom: 1px solid #333;
}

.skeleton-loader th {
  background-color: #222;
  color: #fff;
  font-weight: bold;
  text-align: left;
}

.skeleton-loader td {
  background-color: #111111;
}

.skeleton-loader .skeleton-row td {
  background: linear-gradient(90deg, #111 25%, #333 50%, #111 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite ease-in-out;
}

.skeleton-loader .skeleton-row td {
  background-size: 200% 100%;
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
