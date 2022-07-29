const jwt = require('../utils/jwt')
const createError = require('http-errors')
const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized token missing"
        })
    }
    await jwt.verifyAccessToken(token).then(user => {
        req.user = user
        next()
    }).catch(e => {
        return res.status(401).json({
            message: "Unauthorized"
        })
    })
}
module.exports = auth;