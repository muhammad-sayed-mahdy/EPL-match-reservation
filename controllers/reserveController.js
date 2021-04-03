const { body, validationResult } = require('express-validator');
const lod = require('lodash');
const Match = require('../models/Match');

var match;

const verifyReserve = () => {
    
    return [
        body('id').notEmpty().withMessage('id is required').bail()
        .custom(async (val) => {
            match = await Match.findOne({_id: val});
            if (match) {
                return true;
            }
            throw new Error("Match id does not exist");
        }),
        body('userId').notEmpty().withMessage('userId is required').bail(),
        body('x').notEmpty().withMessage('x is required').bail()  
        .custom(async (val) => {
            if(match && val <= match.stadium.length){
               
                return true;
            }
            throw new Error("x exceeds the max length");
        }),
        body('y').notEmpty().withMessage('y is required').bail()
        .custom(async (val) => {
            if(match && val <= match.stadium.width){
                return true;
            }
            throw new Error("y exceeds the max width");
        })
    ];
};

const reserve_post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const data = lod.pick(req.body, ['id','userId','x','y']);

    for( i=0;i<match.reservations.length;i++ )
    {
        if(match.reservations[i].x ==data.x  && match.reservations[i].y ==data.y)
        {
            res.status(400).json("Seat is already reserved");
            return;
        }
    }
    match.reservations.push({userId:data.userId,x:data.x,y:data.y});
    var objForUpdate = {};
    objForUpdate.reservations = match.reservations;
    objForUpdate = { $set: objForUpdate };
    await Match.findOneAndUpdate({_id:data.id}, objForUpdate,function(err)
    {
        if(err)
        {
            res.status(401).json({"Error":"Something Went Wrong"});
            return;
        }
    });
    res.status(200).json("Reserved Sucessfully");
};

const verifyCancelReserve = () => {
    return [
        body('id').notEmpty().withMessage('id is required').bail()
        .custom(async (val) => {
            match = await Match.findOne({_id: val});
            if (match) {
                return true;
            }
            throw new Error("id does not exist");
        }),
        body('userId').notEmpty().withMessage('userId is required').bail(),
        body('x').notEmpty().withMessage('x is required').bail()  
        .custom(async (val) => {
            if(match && val <= match.stadium.length){
                return true;
            }
            throw new Error("x exceeds the max length");
        }),
        body('y').notEmpty().withMessage('y is required').bail()
        .custom(async (val) => {
            if(match && val <= match.stadium.width){
                return true;
            }
            throw new Error("y exceeds the max width");
        })
    ];
};

const cancelReserve_put = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const data = lod.pick(req.body, ['id','userId','x','y']);
    var found =  false;
    ind = -1;
    for( i=0 ; i<match.reservations.length ; i++ )
    {
        if( match.reservations[i].userId == data.userId  &&  match.reservations[i].x == data.x  && match.reservations[i].y == data.y)
        {
            ind = i;
            found = true;
            break;
        }
    }
    if(found){
        match.reservations.splice(ind,1);

        var objForUpdate = {};
        objForUpdate.reservations = match.reservations;
        objForUpdate = { $set: objForUpdate };
        await Match.findOneAndUpdate({_id:data.id}, objForUpdate,function(err)
        {
            if(err)
            {
                res.status(401).json({"Error":"Something Went Wrong"});
                return;
            }
        });
        res.status(200).json("Reservation is cancelled Sucessfully");
    }
    else{
        res.status(401).json("Reservation does not exists");
    }
};




module.exports = {
    verifyReserve,
    verifyCancelReserve,
    reserve_post,
    cancelReserve_put,
};