import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import initAPIRoute from "./routes/api";
var morgan = require("morgan");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 2110; // Trường hợp PORT undefined

app.use((req, res,next) => {
    //if (error) return....
    console.log("This is Middleware");
    next(); // Next if has no error
})

app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// setup iew engine

configViewEngine(app);

// init Web routes

initWebRoute(app);

initAPIRoute(app);
//handle 404 not found error

app.use((req,res)=>{
return res.render('404.ejs');
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
