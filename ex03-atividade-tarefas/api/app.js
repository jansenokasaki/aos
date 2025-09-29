import express from "express";
import "dotenv/config";
import cors from "cors"
import tasksRoute from "./routes/TasksRoute.js";

const app = express();

app.set("trust proxy", true);

app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", tasksRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
})