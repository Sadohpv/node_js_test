
import express  from 'express';
import configViewEngine from './config/viewEngine';
require('dotenv').config();


const port = process.env.PORT || 2110; // Trường hợp PORT undefined

const app = express();
configViewEngine(app);






app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/about', (req, res) => {
    res.json({
        success: 'test nodejs created',
    })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})