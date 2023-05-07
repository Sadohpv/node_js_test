import express from "express";

var router = express.Router();

import homeController from "../controller/homeController";

const initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);

    router.get("/detail/user/:userId", homeController.getDetailPage);
    router.post("/create-user", homeController.createUser);

    router.post("/delete-user",homeController.deleteUser);
    router.get("/edit-user/:idEdit",homeController.editUser);
    router.post("/update-user",homeController.updateUser);

    app.get("/about", (req, res) => {
        res.json({
            success: "test nodejs created",
        });
    });

    return app.use("/", router);
};

export default initWebRoute;
