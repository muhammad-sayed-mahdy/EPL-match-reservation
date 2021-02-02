const { body, validationResult } = require('express-validator');
const lod = require('lodash');
const {Stadium} = require('../models/Stadium');

const verifyAddStadium = () => {
    return [
        body('name').notEmpty().withMessage('Name is required').bail()
        .custom(async (val) => {
            const stadium = await Stadium.findOne({name: val});
            if (!stadium) {
                return true;
            }
            throw new Error("Name already in use");
        }),
        body('width').notEmpty().withMessage('Width is required').bail(),
        body('length').notEmpty().withMessage('Length is required').bail()
    ];
};

const addStad_post = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const data = lod.pick(req.body, ['name', 'length', 'width']);
    Stadium.create(data).then( 
        res.status(200).send(data)
        ).catch(error => {
        res.json(error);
    });
};

const verifyUpdStadium = () => {
    var oldname;
    return [
        body('name').notEmpty().withMessage('Name is required').bail()
        .custom(async (val) => {
            oldname = val;
            const stadium = await Stadium.findOne({name: val});
            if (stadium) {
                return true;
            }
            throw new Error("Name does not exists");
        }),
        body('newname')
        .custom(async (val) => {
            if(!(oldname == val))
            {
                const stadium = await Stadium.findOne({name: val});
                if (!stadium) {
                    return true;
                }
                throw new Error("New name already in use");
            }

        })
    ];
};

const updStad_put = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const data = lod.pick(req.body, ['name','newname', 'length', 'width']);

    var objForUpdate = {};
    if (data.newname) objForUpdate.name = data.newname;
    if (data.length) objForUpdate.length = data.length;
    if (data.width) objForUpdate.width = data.width;
    objForUpdate = { $set: objForUpdate };

    await Stadium.findOneAndUpdate({name:data.name}, objForUpdate,function(err)
    {
        if(err)
        {
            res.status(401).json({"Error":"Something Went Wrong"});
            return;
        }
    });
    res.status(200).json("Updated Sucessfully")

};


const verifyDltStadium = () => {
    return [
        body('name').notEmpty().withMessage('Name is required').bail()
        .custom(async (val) => {
            const stadium = await Stadium.findOne({name: val});
            if (stadium) {
                return true;
            }
            throw new Error("Name does not exists");
        })
    ];
};

const dltStad_delete = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        res.status(400).json({errors: errors.array()});
        return;
    }
    const data = lod.pick(req.body, ['name']);


    await Stadium.deleteOne({name:data.name},function(err)
    {
        if(err)
        {
            res.status(400).json({"Error":"Something Went Wrong"});
            return;
        }
    });
    res.status(200).json("deleted Sucessfully")

};


module.exports = {
    verifyAddStadium,
    verifyUpdStadium,
    verifyDltStadium,
    addStad_post,
    updStad_put,
    dltStad_delete
};