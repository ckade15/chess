const Blitz = require('../models/Blitz');
// @desc Gets all players from the Blitz leaderboard
// @route GET /api/v1/Blitz
// @access Public
exports.getBlitz = async (req, res, next) => {
    try{
        const blitz = await Blitz.find();
        const ct = await Blitz.countDocuments();
        if (ct == 0){
            return res.status(200).json({
                success: false,
                data: "Blitz leaderboard is empty"
            });
        }
        
        res.status(200).json({
            success: true,
            count: blitz.length,
            data: blitz
        });
    }catch(err){
        res.send(500).json({"Error": err});
    }
}

// @desc Adds a player to the Blitz leaderboard
// @route POST /api/v1/Blitz
// @access Private
exports.postBlitz = async (req, res, next) => {
    try{
        const newPlayer = await Blitz.create(req.body);
        return res.status(201).json({
            success: true,
            data: newPlayer
        });
    }catch(err){
        console.log(`${err}`.red);

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

// @desc Clears the Blitz leaderboard
// @route DELETE /api/v1/Blitz
// @access Private
exports.clearBlitz = async (req, res, next) => {
    try{
        const ct = await Blitz.countDocuments();
        const blitz = await Blitz.deleteMany();
        
        if (ct == 0){
            return res.status(200).json({
            success: false,
            data: blitz,
            "message": "Blitz leaderboard is already empty"
        });
        }else{
            return res.status(200).json({
                success: true,
                data: blitz,
                "message": "Blitz leaderboard has been cleared"
            });
        } 
    }catch(err){
        return res.status(500).json({
            "Error": err,
            "message": "Server Error, could not clear leaderboard"
        });
    }
}