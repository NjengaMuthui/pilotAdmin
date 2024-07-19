import axios from "axios";
import { defineStore } from "pinia";

function CreateQuery(Obj) {
  let queryString = Object.keys(Obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(Obj[key])}`)
    .join("&");
  return "?" + queryString;
}

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      categories: [],
      questions: [],
      currentIndex: 0,
      questionsTotalCount: 0,
      currentPage: 1,
      currentSet: 1,
      reserves: [],
      currentReserveIndex: 0,
      questionsReserveCount: 0,
      currentReservePage: 1,
      currentReserveSet: 1,
      currentUser: ""
    };
  },
  getters: {
    getOptionArray: (state) => {
      return (category, id) => {
        let options = [];
        state.$state[category].forEach((element) => {
          if (id === element.ID)
            options.unshift({
              label: element.longname,
              value: element
            });
          else
            options.push({
              label: element.longname,
              value: element
            });
        });
        return options;
      };
    }
  },
  actions: {
    removeQuestion(index) {
      if (index >= 0 && index < this.questions.length) {
        this.questions.splice(index, 1);
      }
    },
    async getCategories() {
      const res = await axios.get("/question/categories/get");
      this.categories = res.data;
    },
    async getQuestionsCount(Obj) {
      const res = await axios.get("/count" + CreateQuery(Obj));
      if (Obj.table === "questions") this.questionsTotalCount = res.data.count;
      else this.questionsReserveCount = res.data.count;
    },
    async login(obj) {
      const res = await axios.get("/login" + CreateQuery(obj));
      return res.data.result;
    },
    async moveQuestion(obj) {
      const res = await axios.get("/move" + CreateQuery(obj));
      return res;
    },
    async getData(req_type) {
      try {
        const res = await axios.get("/category/get", {
          params: { type: req_type }
        });
        this.$patch({
          [req_type]: res.data
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getQuestions(page) {
      const res = await axios.get("/questions/get" + CreateQuery(page));
      this.questions = res.data;
    },
    async postMinorData(type, url, postMinorData) {
      try {
        let res = await axios.get(url + CreateQuery(postMinorData));
        postMinorData.ID = res.data.insertId;

        this.$state[type].push(postMinorData);
      } catch (error) {
        console.log(error);
        return {
          err: error
        };
      }
    },
    async editMinorData(url, type, editData, index) {
      try {
        let res = await axios.get(url + CreateQuery(editData));
        if (res.data.affectedRows == 1) {
          this.$state[type][index].longname = editData.longname;
          this.$state[type][index].shortname = editData.shortname;
        }
      } catch (error) {
        console.log(error);
        return {
          err: error
        };
      }
    },
    async editQuestion(editData) {
      try {
        let res = await axios.get("/question/put" + CreateQuery(editData));
        console.log(res);
        return res;
      } catch (error) {
        return error;
      }
    },
    async createQuestion(question) {
      try {
        let res = await axios.get("/question/post" + CreateQuery(question));
        return res.data.result;
      } catch (error) {
        return error;
      }
    },
    async modifyCategory(data) {
      try {
        let res = await axios.get("/question/categories" + CreateQuery(data));
        console.log(res);
        return res;
      } catch (error) {
        return error;
      }
    }
  }
});
