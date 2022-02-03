const express = require('express');
const router = express.Router();
const {getRapid, postRapid, clearRapid} = require('../controllers/rapid');

router
    .route('/')
    .get(getRapid)
    .post(postRapid)
    .delete(clearRapid);

module.exports = router;