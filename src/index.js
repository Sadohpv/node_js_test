import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import initAPIRoute from "./routes/api";


require("dotenv").config();

const app = express();
const port = process.env.PORT || 2110; // Trường hợp PORT undefined

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// setup iew engine

configViewEngine(app);

// init Web routes

initWebRoute(app);

initAPIRoute(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
