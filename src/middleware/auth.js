const jwt = require('jsonwebtoken')
const User = require('../models/Users')

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, "data")
    try {
        // verificando na minha lista de token se tal token existe
        const user = await User.findOne({ _id: data._id, 'tokens.token': token})
        if(!user)
            throw new Error()

        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({error: 'Acesso não autorizado'})
    }
}

module.exports = auth