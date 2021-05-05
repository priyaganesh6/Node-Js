'use strict';
const express = require('express');
const router = express.Router();
const {checkLoginReq}=require('./dao')

router.post('/validateLogin', async (req, res, next) => {
       const output = await checkLoginReq(req.body)
    return res.status(200).json(output);
});
module.exports = router;