import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes"; // no `.ts` extension needed

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", routes);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

export default server;
