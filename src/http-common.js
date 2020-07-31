import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-type": "application/json"
  }
  //por medio del cliente axios, se consume la api por una url base
});