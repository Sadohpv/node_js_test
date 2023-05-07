import connectPool from "../config/connectDB";

let getAllUsers = async (req, res) => {
    const [rows, fields] = await connectPool.execute(
        "SELECT * FROM users1"
    );

    return res.status(200).json({
        message: "ok",
        data: rows,
    });
};
let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: "missing required data",
        });
    }

    await connectPool.execute(
        "INSERT INTO users1(firstName, lastName, email,address) VALUES (?,?,?,?)",
        [firstName, lastName, email, address]
    );

    return res.status(200).json({
        message: "ok",
    });
};

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } =
        req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "missing required data",
        });
    }

    await connectPool.execute(
        "UPDATE users1 SET firstName=? , lastName=?, email=?,address=? WHERE id=?",
        [firstName, lastName, email, address, id]
    );
    return res.status(200).json({
        message: "ok",
    });
};

let deleteUser = async (req, res) => {

    let userIdDelete = req.params.id;
    if (!userIdDelete) {
        return res.status(200).json({
            message: "missing required data",
        });
    }
    await connectPool.execute(
        "DELETE FROM users1 WHERE id=?",
        [userIdDelete]
    );


    return res.status(200).json({
        message: "ok",
    });
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};
