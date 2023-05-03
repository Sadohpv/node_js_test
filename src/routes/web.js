import express from "express";

var router = express.Router();

import homeController from "../controller/homeController";

const initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);

    app.get("/about", (req, res) => {
        res.json({
            success: "test nodejs created",
        });
    });

    return app.use("/", router);
};

export default initWebRoute;
