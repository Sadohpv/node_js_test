import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 2110; // Trường hợp PORT undefined

// setup iew engine

configViewEngine(app);

// init Web routes

initWebRoute(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
