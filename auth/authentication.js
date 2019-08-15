const router = require('express').Router();
const User = require('../model/User')
const Validation = require('../validation');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/register', async(req, res) => {
    // console.log("inside authentication");
    const {error} = Validation.registerValidation(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }

    //check if user already exists
    const userExist = await User.findOne({email:req.body.email});
    if(userExist) return res.status(400).send("Alread registered with this email")

    // pass password through bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    // New User creation
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
    });
    try{
        const saveUser = await user.save()
        res.send(saveUser);
    } catch (err) {
        res.status(400).send(err)
    }
    
});

router.post('/login', async (req, res) => {
    const {error} = Validation.loginValidation(req.body);
    if(error){
        return res.status(404).json({
            message: error.details[0].message
        });
    }

    //check if user already exists or not
    const userExist = await User.findOne({email:req.body.email});
    if(!userExist) return res.status(400).json({
        message: "User does not exist, check email or password"
    });

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, userExist.password);
    if(!validPass) return res.status(400).json({
        message: 'Invalid password'
    });

    // web token assigning
    const token = jwt.sign(
        {
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email
        }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json(
            {token}
        );

})

module.exports = router;