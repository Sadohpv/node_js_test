import multer from "multer";
import path from "path";
import connectPool from "../config/connectDB";

let getHomePage = async (req, res) => {
    // let data = [];    // connection.query("SELECT * FROM `users`", function (err, results, fields) {
    //    //connection.execute("SELECT * FROM `users`",....) để tối ưu performent

    //     console.log(results); // results contains rows returned by server

    //     data = results.map((row) => {
    //         return row;
    //     });
    //     // fields contains extra meta data about results, if available
    //
    // });
    const [rows, fields] = await connectPool.execute(
        "SELECT * FROM `users1` "
    );
    // console.log("<<<<Check row:", rows);
    return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
    let id = req.params.userId;
    let [user] = await connectPool.execute(
        `SELECT * FROM users1 WHERE id = ?`,
        [id]
    );
    return res.json({
        id: id,
        user: user,
    });
};
let createUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await connectPool.execute(
        "INSERT INTO users1(firstName, lastName, email,address) VALUES (?,?,?,?)",
        [firstName, lastName, email, address]
    );

    return res.redirect("/");
};

let deleteUser = async (req, res) => {
    let { userIdDelete } = req.body;
    await connectPool.execute("DELETE FROM users1 WHERE id=?", [
        userIdDelete,
    ]);
    return res.redirect("/");
};
let editUser = async (req, res) => {
    let idEdit = req.params.idEdit;
    let [user] = await connectPool.execute(
        "SELECT * FROM users1 WHERE id=?",
        [idEdit]
    );
    return res.render("update.ejs", {
        dataUser: user[0],
    });
    //     return res.json({
    //     deleteUser: user,
    // })
};
let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await connectPool.execute(
        "UPDATE users1 SET firstName=? , lastName=?, email=?,address=? WHERE id=?",
        [firstName, lastName, email, address, id]
    );

    return res.redirect("/");
};

let getUploadFile = async (req, res) => {
    return res.render("uploadFile.ejs");
};

// Handle upload file from here


let upload = multer().single("choose-file");
let postUploadFile = async (req, res) => {


    upload(req, res, (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send("No file selected");
        } else if (err instanceof multer.MulterError) {
            // Trường hợp lỗi của thư viện trả về lỗi của thư viện
            return res.json({
                errLib: err,
            });
        } else if (err) {
            // Trường hợp các lỗi còn lại trả về lỗi
            return res.json({
                error: err,
              
            });
        }
       
        res.json();
    });
};
module.exports = {
    getHomePage: getHomePage,
    getDetailPage: getDetailPage,
    createUser,
    deleteUser,
    editUser,
    updateUser,
    getUploadFile,
    postUploadFile,
};
