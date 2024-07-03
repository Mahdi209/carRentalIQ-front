import axios from "axios";

const instance = axios.create({
  baseURL: "https://carrentaliq.onrender.com/",
});

export default instance;
