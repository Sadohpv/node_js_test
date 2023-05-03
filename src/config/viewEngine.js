import express from 'express';

const configViewEngine = (app)=>{

    app.use(express.static('./src/public/')); // Thư mục được public có thể truy cập từ clients

    app.set('view engine','ejs'); // dùng view engine ejs
    app.set('views','./src/views'); // tìm view engine ở thư mục views và đường dẫn của views
}

export default configViewEngine;