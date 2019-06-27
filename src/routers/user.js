const express = require('express')
const User = require('../models/Users')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/users/home', auth ,async (req, res) =>{
    // por meio do token
    res.send(req.user)
} )

router.post('/users',async (req, res) => {
    console.log(req.body)
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        //console.log(token)
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send("error"+error)
    }
})

router.post('/users/login', async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if(!user)
            return res.status(401).send({error: 'login falhou'})
        
        const token = await user.generateAuthToken()
        res.send({ user, token })        
        } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router