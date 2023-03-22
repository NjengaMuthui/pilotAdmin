import axios from "axios";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      categories: [],
      questions: []
    };
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
        this[req_type] = res.data;
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

        this[type].push(postMinorData);
      } catch (error) {
        console.log(error);
        return {
          err: error
        };
      }
    },
    async editMinorData(url, type, editData, index) {
      try {
        let res = await axios.put(url, editData);
        if (res.data.affectedRows == 1) {
          let dataObject = JSON.parse(editData);
          this[type][index] = dataObject;
        }
      } catch (error) {
        console.log(error);
        return {
          err: error
        };
      }
    }
  }
});
