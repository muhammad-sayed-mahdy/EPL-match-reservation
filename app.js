if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    return app.listen(process.env.PORT);
}).then(() => {
    console.log("App is running");
}).catch(err => {
    console.log(err);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(authRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});
