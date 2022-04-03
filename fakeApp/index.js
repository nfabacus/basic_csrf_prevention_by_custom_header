const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');

const port = 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`fake app listening on port ${port}`);
})