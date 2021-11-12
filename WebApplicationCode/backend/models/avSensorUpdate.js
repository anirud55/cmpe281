const mongoose = require("mongoose");
const { SocketHandler } = require("../socketHandler");

const avSensorUpdateSchema = new mongoose.Schema({
    headlights: {
        type: String,
        required: true,
    },
    tailights: {
        type: String,
        required: true,
    },
    temperature: {
        type: String,
        required: true,
    },

});

const AvSensorUpdate = mongoose.model("avSensorUpdate", avSensorUpdateSchema);

AvSensorUpdate.watch().on("update", (data) => {
    console.log("Data= ", data);
    const { socket } = SocketHandler.getSocketofUsers();
    const userSockets = SocketHandler.getSocketsOfUsers();

    userSockets.forEach((socket) => {
    console.log("Emitting1");
    socket.emit("activeSensorInformation", {
      tailight: data.updateDescription.updatedFields.tailight,
      headlight: data.updateDescription.updatedFields.headlight,
      temperature: data.updateDescription.updatedFields.temperature,
      currentLocation: data.updateDescription.updateFields.currentLocation,
      vid: data.updateDescription.updateFields.vid,
      // ..... (ADD ADDTIONAL SENSORS THAT ARE BEING RECEIVED)
    });
});
});

model.exports.avSensorUpdateSchema = avSensorUpdateSchema;
model.exports.AvSensorUpdate = AvSensorUpdate;
