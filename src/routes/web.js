import express from "express";
import multer from "multer";
import path from "path";
import homeController from "../controller/homeController";

var appRoot = require("app-root-path");
var router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + "/src/public/image/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname +
                "-" +
                Date.now() +
                path.extname(file.originalname)
        );
    },
});
const imageFilter = (req, file, cb) => {
    // Accept image only
    if (
        !file.originalname.match(
            /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/
        )
    ) {
        req.fileValidationError = "Not an image file";
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
};
let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
});

const initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);

    router.get("/detail/user/:userId", homeController.getDetailPage);
    router.post("/create-user", homeController.createUser);

    router.post("/delete-user", homeController.deleteUser);
    router.get("/edit-user/:idEdit", homeController.editUser);
    router.post("/update-user", homeController.updateUser);

    router.get("/uploadFile", homeController.getUploadFile);

    router.post(
        "/uploadFile",
        upload.array("choose-file",5),
        homeController.postMultiUploadFile
    );
    app.get("/about", (req, res) => {
        res.json({
            success: "test nodejs created",
        });
    });

    return app.use("/", router);
};

export default initWebRoute;
