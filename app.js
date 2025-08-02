const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, "public");
require("dotenv").config();
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const PORT = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
    res.render('index');
})
// app.use('/', indexRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on Port ${PORT} and host 0.0.0.0`)
});