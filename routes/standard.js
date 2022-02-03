const express = require('express');
const router = express.Router();
const {getStandard, postStandard, clearStandard} = require('.././controllers/standard');


router
    .route('/')
    .get(getStandard)
    .post(postStandard)
    .delete(clearStandard);

    

module.exports = router;