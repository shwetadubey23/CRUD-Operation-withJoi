const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    try {

        const userData = req.body
        const { firstName, lastName, email, passowrd } = userData

        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false,  message: 'Email already exists' });
        }
        const data = await userModel.create(userData)
        return res.status(201).json({ success: true, message:"Registered successfully",  data: data })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message })
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const userEmail = await userModel.findOne({ email, password });
        if (!userEmail) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        let token = jwt.sign(
            {
                userId: userEmail._id.toString(),
            },
            "secret_key", {

            expiresIn: '4h' // expires in 10h

        });

        let data = {
            userId: userEmail._id.toString(),
            token: token

        }
        return res.status(201).json({ status: true, message: "User login successfull", data: data })

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};

module.exports = { registerUser, login }


