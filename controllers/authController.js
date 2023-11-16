import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";


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
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Internal server error',
            error
        })
    }

}