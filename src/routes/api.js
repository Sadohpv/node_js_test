import express from "express";
import APIController from "../controller/APIController";
var router = express.Router();

const initAPIRoute = (app) => {
    router.get("/users", APIController.getAllUsers);
    router.post("/createUser", APIController.createNewUser);
    router.put('/updateUser', APIController.updateUser);
    router.delete("/deleteUser/:id", APIController.deleteUser);
    return app.use("/api/v1/", router);
};

export default initAPIRoute;
