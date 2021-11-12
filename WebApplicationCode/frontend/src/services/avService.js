import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/av";

export function getAVCount() {
  return http.get(apiEndpoint + "/numberOfAVs");
}
// added
export function getAvStates() {
  return http.get(apiEndpoint + "/avStatus");
}

export function getAVStateAndCount() {
  return http.get(apiEndpoint + "/statesOfAVs");
}

export function getListOfAVs() {
  return http.get(apiEndpoint + "/listOfAVs");
}
