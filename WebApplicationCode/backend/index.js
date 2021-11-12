const config = require("config");

const user = require("./routes/users");
const auth = require("./routes/auth");
const av = require("./routes/av");
const socketRoute = require("./routes/socket");

const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://admin:cmpe281@cmpe281.9y980.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" , {
    // retry to connect 
    reconnectTries: 1,
    // wait 5 seconds before retry
    reconnectInterval: 5000,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Failed to connect to Database"));


const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/av", av);
app.use("/api/socket", socketRoute);

const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(httpServer, options);
const { SocketHandler } = require("./socketHandler");

io.on("connection", (socket) => {
  const jwtToken = socket.handshake.query.jwtToken;
  if (jwtToken != "null") {
    console.log("New socket client added", jwtToken);
    SocketHandler.addSocket(socket.handshake.query.jwtToken, socket);
  }

  socket.on("disconnect", () => {
    const jwtToken = socket.handshake.query.jwtToken;
    if (jwtToken != "null") {
      console.log("Disconnecting client", socket.handshake.query.jwtToken);
      SocketHandler.deleteSocket(socket);
    }
  });
});

const port = process.env.PORT || config.get("port");
httpServer.listen(port, () => console.log(`Listning to port ${port}.... `));
