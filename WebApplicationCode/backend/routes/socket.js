const express = require("express");
const { eq } = require("lodash");
const router = express.Router();
const { SocketHandler } = require("../socketHandler");

router.post("/avStatusUpdate", async (req, res) => {
  const adminSockets = SocketHandler.getSocketsOfAdmins();

  adminSockets.forEach((socket) => {
    console.log("Emitting");
    socket.emit("avStatusUpdated", {
      vid: req.body.vid,
      // email: req.body.email,
      // vmake: req.body.vmake,
      // vmodel: req.body.vmodel,
      // vmileage: req.body.vmileage,
      // roadservice: req.body.roadservice,
      vcurrentstatus: req.body.vcurrentstatus,
    });
  });
  console.log("OUT OF FOR");
  res.status(200).send();
});

// { path: "vid", label: "AV Number" },
//     { path: "email", label: "AV Owner" },
//     { path: "vmake", label: "AV Make" },
//     { path: "vmodel", label: "AV Model" },
//     { path: "vmileage", label: "AV Mileage" },
//     { path: "roadservice", label: "Road Service" },
//     { path: "vcurrentstatus", label: "AV State" },

// added
router.post("/avCurrentServiceUpdate", async (req, res) => {
  const userSockets = SocketHandler.getSocketsOfUsers();

  userSockets.forEach((socket) => {
    console.log("Emitting1");
    socket.emit("activeVehicleData", {
      currentState: req.body.vcurrentstatus,
      serviceState: req.body.vservicestatus,
      roadService: req.body.roadservice,
      vid: req.body.vid,
    });
    //console.log(req.body.currentState);
    console.log(req.body);
  });
  console.log("OUT OF FOR1");
  res.status(200).send();
});

// additional sensors
router.post("/avSensorUpdate", async (req, res) => {
  const userSockets = SocketHandler.getSocketsOfUsers();

  userSockets.forEach((socket) => {
    console.log("Emitting1");
    socket.emit("activeSensorInformation", {
      tailight: req.body.tailight,
      headlight: req.body.headlight,
      temperature: req.body.temperature,
      currentLocation: req.body.currentLocation,
      vid: req.body.vid,
      gps: req.body.gps,
      // ..... (ADD ADDTIONAL SENSORS THAT ARE BEING RECEIVED)
    });
    console.log(req.body);
  });
  console.log("OUT OF FOR1");
  res.status(200).send();
});

module.exports = router;
