const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userModel = require('../model/userModel')


// ______________________ Authentication ____________________________________

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]

        if (!token) {
            return res.status(401).send({ status: false, message: 'please provide token' })
        }
        
       let validateToken = jwt.verify(token, 'secret_key' ) 
            if (!validateToken ) {
                return res.status(401).send({ status: false, message: 'please provide valid token' })
            }
           
            req.loggedInUser = validateToken.userId
           
            next()
        

    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


// ______________________ Authorisation ___________________________________

const authorisation = async function (req, res, next) {
    try {
        let userId = req.params.userId

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: 'user id is not valid' })
        }
        let user = await userModel.findById({_id:userId })
        if (!user) {
            return res.status(404).send({ status: false, message: 'user id does not exist' })
        }
        if (userId != req.loggedInUser) {
            return res.status(403).send({ status: false, message: 'not authorised' })
        }
        next()

    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}


module.exports = { authentication, authorisation }