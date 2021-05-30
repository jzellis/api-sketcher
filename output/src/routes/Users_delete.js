const mongoose = require('mongoose'),
Users = require("../schema/Users");

module.exports = async (req, res, next) =>
{
    let id = req.params.id;
    let body = req.body;
    Users.findOneAndDelete({_id: id}, function(err, item){
        if(err) next(err);
        res.json(item);
    });
}