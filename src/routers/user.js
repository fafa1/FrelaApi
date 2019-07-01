const express = require('express')
const User = require('../models/Users')
const auth = require('../middleware/auth')
const cors = require('cors')

const router = express.Router()

const corsOptions = {
    origin: 'http://localhost:8080/?#/cadastro',
    optionsSuccessStatus: 200 
}

router.get('/home', auth ,async (req, res) => {
    // por meio do token
    res.send(req.user)
} )

router.post('/users', cors(corsOptions), async (req, res) => {
    console.log(req.body)
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
        // res.setHeader('Content-Type', 'application/json')
        res.redirect('/home')
    } catch (error) {
        res.status(400).send("error "+ error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if(!user)
            return res.status(401).send({error: 'Usuário não encontrado'})
        
        console.log(req.body)
        const token = await user.generateAuthToken()
        res.send({ user, token })
        //res.redirect('/')
        } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router