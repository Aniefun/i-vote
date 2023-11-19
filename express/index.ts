import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import Express from "express";

import { start } from "./src/routes";

const app = Express();

const corsOptions = {};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(Express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(Express.urlencoded({ extended: true }));

start(app);

// set port, listen for requests
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`⚡ Server is running on port ${PORT}.`);
});