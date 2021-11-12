const http = require("../services/httpService");
const config = require("config");
const dbURL = config.get("dbEndpoint") + "/vehicle";

const avData = [
  {
    number: "19 AB 8903",
    status: "active",
  },
  {
    number: "16 FG 3908",
    status: "inactive",
  },
  {
    number: "78 GH 3783",
    status: "active",
  },
  {
    number: "42 SI 7300",
    status: "inactive",
  },
  {
    number: "57 HJ 7350",
    status: "active",
  },
];
const avData1 = [
  {
    state: "Idle",
  },
];

class AV {
  static async getCount() {
    const { data: count } = await http.get(dbURL + "/numberOfConnectedAVs");
    console.log("AVCount: ", count);
    return count;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(400);
    //   }, 300);
    // });
  }

  static async getStatesAndNumbers() {
    const { data: avStates } = await http.get(dbURL + "/status");
    return avStates;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const avStates = [
    //       { state: "active", count: 350 },
    //       { state: "inactive", count: 50 },
    //     ];
    //     resolve(avStates);
    //   }, 300);
    // });
  }

  static async getListOfConnectedAVs() {
    const { data: avList } = await http.get(dbURL + "/list/");
    return avList;
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(avData);
    //   }, 300);
    // });
  }

  // added
  static getListOfConnectedAV() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(avData1);
      }, 300);
    });
  }
}

module.exports.AV = AV;
