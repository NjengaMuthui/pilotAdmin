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
    }
  }
});
