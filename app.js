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

app.use('/api', require('./routes/api/apiAuthRoutes'));

app.use('/api/user', require('./routes/api/APIUserRoutes'));
app.use('/api/stadium', require('./routes/api/apiStadiumRoutes'));
app.use('/api/team', require('./routes/api/apiTeamRoutes'));
app.use('/api/admin', require('./routes/api/apiAdminRoutes'));
app.use('/api/reservation', require('./routes/api/apiReservationRoutes'));

app.use(require('./routes/authRoutes'));


app.use((req, res) => {
    res.status(404).render('404');
});
