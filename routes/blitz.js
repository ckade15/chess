const express = require('express');
const router = express.Router();
const {getBlitz, postBlitz, clearBlitz} = require('../controllers/blitz');

router
    .route('/')
    .get(getBlitz)
    .post(postBlitz)
    .delete(clearBlitz);

module.exports = router;