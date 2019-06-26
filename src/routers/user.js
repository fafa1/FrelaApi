const express = require('express')
const User = require('../models/Users')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users', async (req, res) => {
    console.log(req.body)
    try {
        const user = new User(req.body)
        console.log('entrou')
        await user.save()
        console.log('nao entrou')
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('users/login', async(req, res) => {
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