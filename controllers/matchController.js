const { body, validationResult } = require('express-validator');
const lod = require('lodash');
const {Match} = require('../models/Match');

const show_home = (req, res) => {
    res.render("home", {title:"Home"});
};

module.exports = {
    show_home
};