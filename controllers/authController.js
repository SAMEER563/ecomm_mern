 import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
 import JWT from 'jsonwebtoken';


 export const registerController = async(req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        // validation
        if(!name){
            return res.send({error: 'Name is Required'})
        }
        if(!email){
            return res.send({error: 'Email is Required'})
        }
        if(!password){
            return res.send({error: 'Password is Required'})
        }
        if(!phone){
            return res.send({error: 'Phone no is Required'})
        }
        if(!address){
            return res.send({error: 'Address is Required'})
        }

        // check user
        const existingUser  = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Registered Please login'
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Registration',
            error,
        })
    }
 };

//  export const loginController = async(req, res) => {
//     try {
//         const {email, password} = req.body
//         //validate
//         if(!email || !password){
//             return res.status(404).send({
//                 success:false,
//                 message:'Invalid email or password'
//             })
//         }
//         //check user

//         const match = await comparePassword(password, user.password)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error in login',
//             error
//         })
//     }
//  };
