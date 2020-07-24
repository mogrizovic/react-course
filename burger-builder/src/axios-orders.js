import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-f0bf0.firebaseio.com/",
});

export default instance;
