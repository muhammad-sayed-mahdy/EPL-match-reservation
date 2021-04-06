const { body, validationResult } = require('express-validator');
const lod = require('lodash');
const Match = require('../models/Match');
const mongoose = require('mongoose');

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
        body('x_i').notEmpty().withMessage('x is required').bail()  
        .custom(async (val) => {
            for(i=0;i<val.length;i++)
            {
                if (!(match && val[i] <= match.stadium.length))
                    throw new Error("x exceeds the max length");
            }
            return true;
        }),
        body('y_i').notEmpty().withMessage('y is required').bail()
        .custom(async (val) => {
            for(i=0;i<val.length;i++)
            {
                if (!(match && val[i] <= match.stadium.width))
                    throw new Error("y exceeds the max width");
            }
            return true;
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

    const data = lod.pick(req.body, ['id','x_i','y_i']);
    data.userId = req.user._id;

    if(data.x_i.length != data.y_i.length)
    {
        res.status(400).json({"Error":"x and y arrays should be equal"});
        return;
    }
    const session = await mongoose.startSession();
    // const transactionOptions = {
    //     readPreference: 'primary',
    //     readConcern: { level: 'local' },
    //     writeConcern: { w: 'majority' }
    // };
    
    try {
        await session.withTransaction( async () =>{
            for(j =0;j<data.x_i.length;j++)
            {
                for( i=0;i<match.reservations.length;i++ )
                {
                    if(match.reservations[i].x_i ==data.x_i[j]  && match.reservations[i].y_i ==data.y_i[j])
                    {
                        await session.abortTransaction();
                        throw new Error("Seats are already reserved");
                    }
                }
            }

            for(j =0;j<data.x_i.length;j++)
            {
                match.reservations.push({user_id:data.userId,x_i:data.x_i[j],y_i:data.y_i[j]});
                let objForUpdate = {};
                objForUpdate.reservations = match.reservations;
                objForUpdate = { $set: objForUpdate };
                
                await Match.findOneAndUpdate({_id:data.id}, objForUpdate,/*{session:session}*/);
            }
            await session.commitTransaction();
            res.status(200).json({"ticket":{"x_i":data.x_i,"y_i":data.y_i}});
        }/*,transactionOptions*/);

    } catch (error) {
        
        res.status(400).send({"error":error.message});
        
    }   

    // finally{
    //     session.endSession();
    // }

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
        body('x_i').notEmpty().withMessage('x is required').bail()  
        .custom(async (val) => {
            if(match && val <= match.stadium.length){
                return true;
            }
            throw new Error("x exceeds the max length");
        }),
        body('y_i').notEmpty().withMessage('y is required').bail()
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
    const data = lod.pick(req.body, ['id','x_i','y_i']);
    data.userId = req.user._id;
    var found =  false;
    ind = -1;
    for( i=0 ; i<match.reservations.length ; i++ )
    {
        if( String(match.reservations[i].user_id) == String(data.userId)  &&  match.reservations[i].x_i == data.x_i  && match.reservations[i].y_i == data.y_i)
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


const showReserve_get = async (req, res) => {

    if(req.query.id ==undefined)
    {
        res.status(400).json({"Error":"id is required" });
        return;
    }

    match = await Match.findOne({_id: req.query.id});
    if (match) {
        res.status(200).json({"reservedSeats":match.reservations});
    }
    res.status(400).json({"Error":"id does not exist"});

};


module.exports = {
    verifyReserve,
    verifyCancelReserve,
    reserve_post,
    cancelReserve_put,
    showReserve_get
};