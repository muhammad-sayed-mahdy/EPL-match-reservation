if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const { checkUser } = require('./middleware/auth');

const app = express();

mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,useFindAndModify:false})
.then(result => {
    return app.listen(process.env.PORT);
}).then(() => {
    console.log("App is running");
}).catch(err => {
    console.log(err);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({extended:true}));

// To use bootstrap and jquery
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('*', checkUser);

app.use('/api', require('./routes/api/apiAuthRoutes'));
app.use('/api/user', require('./routes/api/APIUserRoutes'));
app.use('/api/reservation', require('./routes/api/apiReservationRoutes'));

app.use(require('./routes/api/apiMatchRoutes'));
app.use('/admin', require('./routes/web/AdminRoutes'));
app.use(require('./routes/web/authRoutes'));
app.use('/user', require('./routes/web/UserRoutes'));

app.use((req, res) => {
    res.status(404).render('404',{title:"Error"});
});
