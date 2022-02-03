const Rapid = require('../models/Rapid');

// @desc Gets all players from the Rapid leaderboard
// @route GET /api/v1/rapid
// @access Public
exports.getRapid = async (req, res, next) => {
    try{
        const rapid = await Rapid.find();
        const ct = await Rapid.countDocuments();
        if (ct == 0){
            return res.status(200).json({
                success: false,
                data: "Rapid leaderboard is empty"
            });
        }
        res.status(200).json({
            success: true,
            count: rapid.length,
            data: rapid
        });
    }catch(err){
        res.send(500).json({"Error": err});
    }
}

// @desc Adds a player to the Rapid leaderboard
// @route POST /api/v1/rapid
// @access Private
exports.postRapid = async (req, res, next) => {
    try{
        const newPlayer = await Rapid.create(req.body);
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

// @desc Clears the Rapid leaderboard
// @route DELETE /api/v1/rapid
// @access Private
exports.clearRapid = async (req, res, next) => {
    try{
        const ct = await Rapid.count();
        const rapid = await Rapid.deleteMany();
        if (ct == 0){
            return res.status(200).json({
            success: false,
            data: rapid,
            "message": "Rapid leaderboard is already empty"
        });
        }else{
            return res.status(200).json({
                success: true,
                data: rapid,
                "message": "Rapid leaderboard has been cleared"
            });
        }
        
        
    }catch(err){
        return res.status(500).json({
            "Error": err,
            "message": "Server Error, could not clear leaderboard"
        });
    }
}