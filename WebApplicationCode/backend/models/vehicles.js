const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

const http = require("../services/httpService");
const dbURL = config.get("dbEndpoint") + "/vehicle";
const dbURL1 = config.get("dbEndpoint") + "/vehicleride";

const { User } = require("../models/user");

const userVehicleArray = [
  {
    email: "",
    vId: "",
    vColor: "",
    vMake: "",
    vModel: "",
    vMileage: "",
    vPspace: "",
  },
];

const scheduleRideArray = [
  {
    email: "",
    vId: "",
    Origin: "",
    Passengers: "",
    Destination: "",
  },
];

class VehicleList {
  static async getVehicles(email) {
    const { data: vehicle } = await http.get(dbURL + "/search?", {
      params: {
        email: email,
      },
    });
    console.log("Geting vehicles", vehicle);
    return (vehicle);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("In 'getMyVehicles()', EMAIL: ", email);
    //     const result = {};

    //     const task_names = userVehicleArray.map(function (task) {
    //       return task.vId;
    //     });
    //     const t1 = userVehicleArray.filter(function (task) {
    //       return task.email === email;
    //     });

    //     console.log("t1", t1);

    //     console.log(task_names);

    //     resolve(t1);
    //   }, 300);
    // });
  }
  static async addVehicle(vehicle) {
    console.log("INSIDE VEEHICLE", vehicle);
    const { status: vehicleData } = await http.post(dbURL + "/add", {
            vid: vehicle.vId,
            email: vehicle.email,
            vcolor: vehicle.vColor,
            vmake: vehicle.vMake,
            vmodel: vehicle.vModel,
            vmileage: vehicle.vMileage,
            vpassengerspace: vehicle.vPspace,
            vservicestatus: vehicle.vServiceStatus,
            vcurrentstatus: vehicle.vCurrentStatus,
            location: vehicle.vLocation,
            roadservice: vehicle.vRoadService,
      });
      console.log("status1: ", vehicleData);
      if (vehicleData == 200) {
        return vehicle;
      } else {
          return 200;
      }



    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const vehicleData = {
    //       email: vehicle.email,
    //       vId: vehicle.vId,
    //       vColor: vehicle.vColor,
    //       vMake: vehicle.vMake,
    //       vModel: vehicle.vModel,
    //       vMileage: vehicle.vMileage,
    //       vPspace: vehicle.vPspace,
    //     };

    //     const task_names = userVehicleArray.map(function (task) {
    //       return task.vId;
    //     });

    //         var n = task_names.includes(vehicle.vId);
    //         if(!n)
    //         {
    //           userVehicleArray.push(vehicleData);
    //         }
    //         //userVehicleArray.push(vehicleData);
    //         console.log("PUSHED: ", userVehicleArray);
    //         resolve(userVehicleArray);
    //       }, 300);
    //     });
      }
      static async deleteVehicle(iD) {

      console.log("INSIDE Delete VEHICLE", iD);

      const { data: vId } = await http.get(dbURL + "/search?", {
        params: {
          vid: iD,
        },
      });
      
      // const { status: dvehicle } = await http.delete(dbURL + "/delete/" + iD, {
      //   params: {
      //     vid: iD,
      //   },
      // });
      console.log("delete:", {vId});
      if(vId.length == 0)
      {
        console.log("No id");
        return 400;
      }
      else{
         const { status: dvehicle } = await http.delete(dbURL + "/delete/" + iD, {
          params: {
          vid: iD,
        },
      });

      console.log("status2: ", dvehicle);
      if (dvehicle == 200) {
        return dvehicle;
      } else {
          return 200;
      }

      }
        // return new Promise((resolve) => {
        //   setTimeout(() => {

        //     console.log("In 'getMyVehicles()', EMAIL: ", vehicle);

        //   //   const task_names = userVehicleArray.map(function (task) {
        //   //     return task.vId; 
        //   // });

        //     // const t1 = userVehicleArray.filter(function (task) {
        //     //   return task.vId == vehicle; 
        //     // });

        //     // console.log("Popped: ", t1);

        //     //var n = task_names.includes(vehicle.vId);
        //     // if(n)
        //     // {
        //     //   delete userVehicleArray[vehicle.vId];
        //     // }
        //     //userVehicleArray.push(vehicleData);
        //     console.log("Popped: ", userVehicleArray);
        //     resolve(userVehicleArray);
        //   }, 300);
        // });
      }

  static async scheduleRide(ride) {

    console.log("INSIDE VEEHICLE1", ride);
    // const { data: vId } = await http.get(dbURL + "/search?" , {
    //   params: {
    //     email: ride.email,
    //   },
    // });
    const vId = await http.get(dbURL + "/search?" , {
      params: {
        email: ride.email,
      },
    });
    const vId2 = await http.get(dbURL + "/search?email=" + ride.email + "&&vid=" + ride.vId);
    console.log(dbURL + "/search?email=" + ride.email + "&&vid=" + ride.vId)
    // const vId1 = {

    // }
    //console.log("ScheduleRide:", vId);

    // if (vId.length == 0)
    // {
    //   console.log("No vid");
    //   return 400;
    // }
    // else 

    if (vId2.data.length != 0){
      console.log("vid exists");
      const { status: rideData } = await http.post(dbURL1 + "/add", {
            vid: ride.vId,
            email: ride.email,
            origin: ride.Origin,
            passengers: ride.Passengers,
            destination: ride.Destination,
            vdatetime: ride.Datetime,
      });
      console.log("status2: ", rideData);
      if (rideData == 200) {
        return ride;
      } else {
          return 200;
      }
    }
    else{
      console.log("No vid");
      return 400;
    }
    // const { status: rideData } = await http.post(dbURL1 + "/add", {
    //         vid: ride.vId,
    //         email: ride.email,
    //         origin: ride.Origin,
    //         passengers: ride.Passengers,
    //         destination: ride.Destination,
    //   });
    //   console.log("status2: ", rideData);
    //   if (rideData == 200) {
    //     return ride;
    //   } else {
    //       return 200;
    //   }


    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const scheduleData = {
    //       email: ride.email,
    //       vId: ride.vId,
    //       Origin: ride.Origin,
    //       Passengers: ride.Passengers,
    //       Destination: ride.Destination,
    //     };
    //     scheduleRideArray.push(scheduleData);
    //     console.log("PUSHED12341234: ", scheduleRideArray);
    //     resolve(scheduleRideArray);
    //   }, 300);
    // });
  }

  static async getRides(email) {
    const { data: rides } = await http.get(dbURL1 + "/search?", {
      params: {
        email: email,
      },
    });
    console.log("Geting rides", rides);
    return (rides);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("In '123()'");
    //     const result = {};

    //     const t1 = scheduleRideArray.filter(function (task) {
    //       return task.email === email;
    //     });
    //     // console.log(result + "RESULT");
    //     //console.log(userVehicleArray[0].vColor + "RESULT1");
    //     resolve(t1);
    //   }, 300);
    // });
  }
}
module.exports.VehicleList = VehicleList;
