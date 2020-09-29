const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel.js");



router.post("/register", async (req, res) => {
        try{
        let {email, password, passwordCheck, displayName} = req.body;

        if (!email || !password || !passwordCheck)
                return res.status(400).json({msg: "Fill the fields."});
        if (password.length < 5)
                return res.status(400).json({msg: "Password below 5 charachters."});
        if (password !== passwordCheck)
                return res.status(400).json({msg: "Enter the password twice"});

        const existingUser = await User.findOne({email: email});
        if (existingUser){
                return res.status(400).json({msg: "email taken"});
        }
        if (!displayName){
                displayName = email;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser = new User({
                email,
                password: passwordHash,
                displayName
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
} 
        catch (err) {
                res.json({error: err.message});
        }
});


router.post("/login", async (req, res) => {
        try {
                const {email, password} = req.body;

                if (!email || !password)
                        return res.status(400).json({msg: "Password or email not entered"});

                const user = await User.findOne({email: email});
                if (!user)
                        return res.status(400).json({msg: "no account with this email"});

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                        return res.status(400).json({msg: "invalid credentials"});
                
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
                //console.log(token);
                res.json({
                        token,
                        user: {
                        id: user._id,
                        displayName: user.displayName,
                        email: user.email
                        },
                })                
        } catch (err) {
                res.status(500).json({error: err.message});
        }
});


router.delete("/delete", auth, async (req, res) => {
        try {
                const deleteUser = await User.findByIdAndDelete(req.user);
                res.json(deleteUser);
        } catch (error) {
                res.status(500).json({error: err.message})
        }
});

router.post("/tokenIsValid", async (req, res) => {
        try {
                const token = req.header("x-auth-token");
                if (!token)
                        return res.json(false);

                const verified = jwt.verify(token, process.env.JWT_SECRET);
                if (!verified)
                        return res.json(false);

                const user = await User.findById(verified.id);
                if (!user)
                        return res.json(false);

                return res.json(true);
        } catch (error) {
                return res.status(500).json({error: err.message});
        }
})

module.exports = router;