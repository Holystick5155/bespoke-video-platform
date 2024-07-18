const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

// Checking email format and existence
const validateEmail = [
    check('email').isEmail().withMessage('Invalid email address'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;
        try{
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({msg: 'Email already registered'});
            }
            req.email = email;
            next();
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
]

module.exports = validateEmail;