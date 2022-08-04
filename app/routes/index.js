const express = require('express');
const router = express.Router();
const { login, user, getAllHour, addHour, updateHour, deleteHour, logout } = require('../controller/user.js');
const auth = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');

//web routes

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 8 }), login) // login route

router.get('/user', auth, user)

router.get('/getallregistration', auth, getAllHour)

router.post('/hour-registration', auth, addHour) // hour registration

router.post('/update-hour', auth, updateHour) // updateHour

router.delete('/delete-hour', auth, deleteHour)

router.get('/logout', auth, logout)

module.exports = router;