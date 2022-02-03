const express = require("express");
const router = express.Router();
const User = require('../models/user')

router.post('/register', async(req, res) => {

    // receiving values
    // const newuser = new User(req.body)
    const newuser = new User({ name: req.body.name, email: req.body.email, password: req.body.password })

    try {        
        const user = await newuser.save()
        res.send('User Register Successfully :)')

    } catch (error) {
        return res.status(400).json({ error})
        
    }
})

router.post('/login', async(req, res) => {

    // destructuring values that are coming from FrontEnd
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email, password: password })
        if(user) {

            // to avoid store password in the DB
            const temp = {
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id
            }
            res.send(temp)

        }else {
            return res.status(400).json({ message: 'Login Failed :(' })

        }
        

    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router