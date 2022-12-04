import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./db.js";
import { notiteRouter } from "./routers/notite-router.js";

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/notite-api", notiteRouter);



app.listen(8081, async () => {
    console.log("Express port 8081")
  try {
    await sequelize.authenticate()
    console.warn('Connected')
  } catch (error) {
    console.warn('Unable to connect to db')
    console.warn(error)
  }
})