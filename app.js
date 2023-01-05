import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import indexRoute from "./routes/indexRoute.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = fileURLToPath(new URL("./", import.meta.url));
const publicpath = path.join(__dirname, "public");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(publicpath));
app.use("/api", indexRoute);
app.get("*", (_, res) => res.sendFile(path.resolve(publicpath, "index.html")));
connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected succesfully");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.log);
