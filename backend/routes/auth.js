const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const User = require("../models/User");
const { body,validationResult } = require("express-validator");

router.post("/createUser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const doesEmailAlreadyExist = await User.findOne({
            email: req.body.email
        });
        if(doesEmailAlreadyExist){
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, "abc");
        res.json({authToken});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

});


router.post("/login",[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ error: "Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ error: "Please try to login with correct credentials"});
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, "abc");
        res.json({authToken});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/getuser", fetchuser, async (req,res)=>{
    
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;