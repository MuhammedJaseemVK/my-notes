import userModel from "../models/userModel.js";
import { hashPassword, comparePassword, generateToken } from "../helpers/authHelper.js";


// Login || Method POST
export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check if all fields are valid
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        }
        // check if email already signed up
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'This email is already registered'
            })
        }
        // register new user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            password: hashedPassword
        }).save()
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error
        })
    }
}

// Login || Method POST
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if all fields are valid
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        }
        // check if mail is regstered
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        // check email and password
        const hashedPassword = user.password;
        const match = await comparePassword(password, hashedPassword);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        const data = { _id: user._id };
        const token = await generateToken(data);
        res.status(200).send({
            success: true,
            message: 'User logged in ',
            token
        })
    }
    catch (error) {
        console.error(error);
    }
}