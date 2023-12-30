const jwt = require('jsonwebtoken')
const { User, Role } = require('../models')
require('dotenv').config()

exports.authMiddleware = async (req, res, next) => {
    let token

    // Set token to cookies
    token = req.headers['authorization']

    if (!token) {
        return next(res.status(401).json({
            status: 'Not Authorize',
            message: 'User not authorize'
        }))
    }

    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return next(res.status(401).json({
            error: error,
            message: 'Token invalid'
        }))
    }

    const currentUser = await User.findByPk(decoded.id)
    if (!currentUser) {
        return next(res.status(401).json({
            error: 'Invalid Token',
            message: "user not found"
        }))
    }
    req.user = currentUser;

    next()
}