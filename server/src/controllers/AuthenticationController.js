const {User} = require('../models')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt-nodejs')

function jwtSignUser (user) {
    return jwt.sign(user, config.authentication.jwtSecret, {expiresIn: "7d"})
}

module.exports = {
    async register (req, res) {       
        try {
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
             
        } catch (err) {
            
            res.status(400).send({
                
                error: 'This email account is already in use.'
            })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: { email : email }

            })
            if(!user) {
               return res.status(400).send({error: 'No user is found'})
            }
            
            const isPasswordValid = user.comparePassword(password)
            console.log(isPasswordValid)
            if(!isPasswordValid) {
               return res.status(400).send({error: 'login information is incorrect'})
            }

            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
        })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    }
   
    
    
}