if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

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
app.use(passport.initialize());

app.use(require('./routes/authRoutes'));
app.use('/api', require('./routes/api/apiAuthRoutes'));
app.use('/api', require('./routes/api/apiStadiumRoutes'));
app.use('/api', require('./routes/api/apiTeamRoutes'));
app.use('/api', require('./routes/api/apiReservationRoutes'));

app.use((req, res) => {
    res.status(404).render('404');
});
