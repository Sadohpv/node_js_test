// get the client
import mysql from "mysql2/promise";

// create the connection to database
const connectPool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "nodej_basic",
});

// simple query


// with placeholder
// connection.query(
//     "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
//     ["Page", 45],
//     function (err, results) {
//         console.log(results);
//     }
// );

export default connectPool;