const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const portNumber = 3000;
app.listen(portNumber);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(authRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});
