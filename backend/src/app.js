import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { mongoose } from "mongoose";
import cors from "cors";
import {connectToSocket} from "./controllers/socketManager.js";
import userRoutes from "./routes/usersRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
  try {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://zoomclone:zoomclone@cluster0.ok2p1.mongodb.net/zoom?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
      console.log("LISTENIN ON PORT 8000");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
