const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const Jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

//login
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await prisma.pmt_users.findFirst({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        return res.send(JSON.stringify({ "response": "User not found" }))
    }
    const checkPassword = bcrypt.compareSync(req.body.password, user.password)
    if (!checkPassword) return res.send(JSON.stringify({ "response": "password mismatch" }))
    delete user.password
    const accessToken = await jwt.signAccessToken(user)
    res.cookie('token', accessToken, { maxAge: 900000, httpOnly: true });
    res.status(200).json({
        status: true,
        message: 'User Login Successfully',
        data: user,
        token: accessToken
    })
}

//hour-registration 
const addHour = async (req, res) => {
    const hour = await prisma.pmt_hour_register.create({
        data: {
            user_id: req.me.payload.id,
            pdate: new Date(req.body.pdate),
            hours: parseFloat(req.body.hours),
            proj_id: parseInt(req.body.proj_id),
            activity: req.body.activity,
            description: req.body.description,
            extra_work: parseInt(req.body.extra_work),
        },
    })
    res.status(200).json({
        status: true,
        message: 'Hour Registered Successfully',
        data: hour,
    })
}

// updateHour registration
const updateHour = async (req, res) => {
    const updateHour = await prisma.pmt_hour_register.updateMany({
        where: {
            AND: [
                {
                    id: parseInt(req.param('id')),
                },
                {
                    user_id: req.me.payload.id,
                }
            ],
        },
        data: {
            pdate: new Date(req.body.pdate),
            hours: parseFloat(req.body.hours),
            proj_id: parseInt(req.body.proj_id),
            activity: req.body.activity,
            description: req.body.description,
            extra_work: parseInt(req.body.extra_work),
        },
    })
    res.status(200).json({
        status: true,
        message: 'Hour Updated Successfully',
        data: updateHour,
    })
}

// delete hour registartion
const deleteHour = async (req, res) => {
    const deleteHour = await prisma.pmt_hour_register.deleteMany({
        where: {
            id: parseInt(req.param('id')),
            user_id: req.me.payload.id
        },
    })
    res.status(200).json({
        status: true,
        message: 'Hour Deleted Successfully',
        data: deleteHour,
    })
}

// get all Hours
const getAllHour = async (req, res) => {
    const allHours = await prisma.pmt_hour_register.findMany({
        where: {
            user_id: req.me.payload.id
        },
    })
    res.status(200).json({
        status: true,
        message: 'Registered Hours Fetched Successfully',
        data: allHours,
    })
}

// logout
const logout = async (req, res) => {
    const authHeader = req.headers["authorization"];
    Jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if (logout) {
            res.send({ msg: 'You have been Logged Out' });
        } else {
            res.send({ msg: 'Error' });
        }
    });
}

module.exports = {
    login,
    addHour,
    updateHour,
    deleteHour,
    getAllHour,
    logout
}