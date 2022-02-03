const Standard = require('../models/Standard');

// @desc Adds a player to the blitz leaderboard
// @route POST /api/v1/blitz/add
// @access Public
exports.getStandard = async (req, res, next) => {
    try{
        const standard = await Standard.find();
        const ct = await Standard.countDocuments();
        if (ct == 0){
            return res.status(200).json({
                success: false,
                data: "Standard leaderboard is empty"
            });
        }
        res.status(200).json({
            success: true,
            count: standard.length,
            data: standard
        });
    }catch(err){
        res.send(500).json({"Error": err});
    }
}

// @desc Adds a player to the Standard leaderboard
// @route POST /api/v1/Standard
// @access Private
exports.postStandard = async (req, res, next) => {
    try{
        const newPlayer = await Standard.create(req.body);
        return res.status(201).json({
            success: true,
            data: newPlayer
        });
    }catch(err){
        // Maps the errors to a list of strings
        if (err.name == 'ValidationError'){
            const response = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: response
            });
        }else{
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc Clears the Standard leaderboard
// @route DELETE /api/v1/Standard
// @access Private
exports.clearStandard = async (req, res, next) => {
    try{
        const ct = await Standard.countDocuments();
        const standard = await Standard.deleteMany();
        if (ct == 0){
            return res.status(200).json({
            success: false,
            data: standard,
            "message": "Standard leaderboard is already empty"
        });
        }else{
            return res.status(200).json({
                success: true,
                data: standard,
                "message": "Standard leaderboard has been cleared"
            });
        }
        
        
    }catch(err){
        return res.status(500).json({
            "Error": err,
            "message": "Server Error, could not clear leaderboard"
        });
    }
}