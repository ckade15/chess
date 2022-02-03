const mongoose = require('mongoose');

const BlitzSchema = new mongoose.Schema({
    ranking: {
        type: Number,
        trim: true,
        required: [true, 'Ranking is required']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Country is required']
    },
    rating: {
        type: Number,
        trim: true,
        required: [true, 'Rating is required']
    },
    avgRating: {
        type: String,
        required: [true, 'AvgRating is required']
    }
});

module.exports = mongoose.model('Blitz', BlitzSchema);