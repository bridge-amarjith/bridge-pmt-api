const express = require('express');
const router = express.Router();
const { login,getAllHour, addHour, updateHour,deleteHour } = require('../controller/user.js');
const auth = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');

//web routes

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 8 }), login) // login route

router.get('/getallregistration', auth, getAllHour)

router.post('/hour-registration', auth, addHour) // hour registration

router.post('/update-hour', auth, updateHour) // updateHour

router.delete('/delete-hour', auth, deleteHour)

module.exports = router;