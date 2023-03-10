import axios from "axios";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      topics: [],
      subtopics: [],
      units: [],
      questions: []
    };
  },
  actions: {
    async getData(req_type) {
      try {
        const res = await axios.get("/" + req_type);
        switch (req_type) {
          case "topic":
            this.topics = res.data;
            break;
          case "subtopic":
            this.subtopics = res.data;
            break;
          case "unit":
            this.units = res.data;
            break;
          case "questions":
            this.questions = res.data;
            break;
        }
      } catch (error) {
        alert(error);
      }
    },
    async postMinorData(type, url, postMinorData) {
      try {
        let res = await axios.post(url, postMinorData);
        console.log(res.data);
        console.log(postMinorData);
        postMinorData.ID = res.data.insertId;

        switch (type) {
          case "topic":
            this.topics.push(postMinorData);
            break;
          case "subtopic":
            this.subtopics.push(postMinorData);
            break;
          case "unit":
            this.units.push(postMinorData);
            break;
          case "questions":
            this.questions.push(postMinorData);
            break;
        }
      } catch (error) {
        alert(error);
        return {
          err: error
        };
      }
    },
    async editMinorData(type, editData, index) {
      try {
        let res = await axios.post("/" + type + "/update", editData);
        if (res.data.affectedRows == 1) {
          let dataObject = JSON.parse(editData);
          switch (type) {
            case "topic":
              this.topics[index] = dataObject;
              break;
            case "subtopic":
              this.subtopics[index] = dataObject;
              break;
            case "unit":
              this.units[index] = dataObject;
              break;
            case "questions":
              this.questions[index] = dataObject;
              break;
          }
        }
      } catch (error) {
        alert(error);
        return {
          err: error
        };
      }
    }
  }
});
