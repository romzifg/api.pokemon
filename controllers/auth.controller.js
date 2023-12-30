const { User } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.user_id)
    const cookieOption = {
        expiresIn: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
        ),
        httpOnly: false
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    return res.status(200).json({
        statusCode: 200,
        message: 'Success',
        data: user,
    })
}

exports.register = async (req, res) => {
    try {
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({
                status: 'error',
                message: 'Password is not match'
            })
        }

        const user = await User.create({
            fullname: req.body.fullname,
            username: req.body.username,
            password: req.body.password
        })

        createSendToken(user, 201, res)
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                status: 'error',
                message: 'Error Validation, Username or Password cannot be empty'
            })
        }

        const userData = await User.findOne({ where: { username: req.body.username } })
        if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid Username or Password'
            })
        }

        createSendToken(userData, 200, res)
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: 'Fail',
            error: error.message
        })

    }
}

exports.logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        expiresIn: new Date(0)
    })

    return res.status(200).json({
        status: "success",
        message: "User Logout"
    })
}