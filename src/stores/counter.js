import axios from "axios";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      categories: [],
      questions: []
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
    async getCategories() {
      const res = await axios.get("/question/categories");
      this.categories = res.data;
    },
    async getData(req_type) {
      try {
        const res = await axios.get("/category", {
          params: { type: req_type }
        });
        this.$patch({
          [req_type]: res.data
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getQuestions() {
      const res = await axios.get("/questions");
      this.questions = res.data;
    },
    async postMinorData(type, url, postMinorData) {
      try {
        let res = await axios.post(url, postMinorData);
        console.log(res.data);
        console.log(postMinorData);
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
        console.log(editData);
        let res = await axios.put(url, editData);
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
    async editQuestion(editData, index) {
      try {
        let res = await axios.put("/question", editData);
        if (res.data.affectedRows == 1) {
          this.questions[index].category = [];
          this.categories.forEach((element) => {
            this.questions[index].category.push(editData[element].value);
            return 1;
          });
        }
        return res;
      } catch (error) {
        return error;
      }
    },
    async createQuestion(question) {
      try {
        let res = await axios.put("/question", question);
        if (res.data.affectedRows == 1) {
          question.category = [];
          this.categories.forEach((element) => {
            question.category.push(question[element]);
          });
          this.questions.unshift(question);
        }
      } catch (error) {
        return error;
      }
    },
    async modifyCategory(data) {
      try {
        let res = await axios.post("/question/categories", data);
        console.log(res);
        return res;
      } catch (error) {
        return error;
      }
    }
  }
});
