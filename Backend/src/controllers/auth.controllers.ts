import type { Request, Response } from "express";
import User, { staticImage } from '../models/user.model.ts'
import bcrypt from "bcryptjs" // importing element from package downloaded
import type { RequestHandler } from "express";

import { generateJWT } from "../lib/utils.ts";
import cloudinary from "../lib/cloudinary.ts";
import { ObjectId } from "mongoose";

export async function signup(req: Request, res: Response) {
    const { fullName, email, password } = req.body; // This line creates three separate variables, each one takes its value Ex: email = req.body.emailc
    try {
        if (!fullName || !email || !password)
            return res.status(400).json({ message: "All fields are required!" })

        if (password.length < 6) {
            console.log("Password too short, exiting");
            return res.status(400).json({ message: "Password must be atleast 6 characters" })
        }

        // looks for a document with this email inside the collection, then it return the document found || null, {email} stands for {email: ".."} its an object that we search for 
        const user = await User.findOne({ email })
        if (user) {

            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new js object(document) that follows schema rules -> using User(model)
        const newUser = new User({
            fullName: fullName,
            email,
            password: hashedPassword,
            profilePic: staticImage
        })

        // save newUser inside the DB
        await newUser.save()

        // generate JWT token
        const jwToken = generateJWT(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePicture,
        })
    }
    catch (error) {
        console.log(`Error in signUp function controller`, (error as Error).message)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required!" })

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "No user with such email!" })

        const isPsswdCorrect = await bcrypt.compare(password, user.password)
        if (!isPsswdCorrect)
            return res.status(400).json({ message: "Invalide password" })
        generateJWT(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        })
    }
    catch (error) {
        console.log(`Error in login function controller`, (error as Error).message)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "User logged out!" })
    }
    catch (error) {
        console.log(`Error in logout function controller`, (error as Error).message)
        res.status(500).json({ message: "Internal server error!" })
    }
}

// whats the difference between api key and api secret ?
export const editProfile: RequestHandler = async (req, res) => {
    try {

        const userId: ObjectId = (req as any).user._id;
        const { profilePicture } = req.body;
        if (!profilePicture)
            return res.status(400).json({ message: "There is no picture to update!" })

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true } // return the new updated user object
        )

        res.status(200).json(updatedUser)
    }
    catch (error) {
        console.log("Error in editProfile controller (auth.controllers.ts)", (error as Error).message);
        return res.status(500).json({message: "Internal server error"})
    }
}

// Purpose: keep the frontend’s “logged-in state” in sync with the server.
export const checkAuth: RequestHandler = (req, res) => {
    try {
        return res.status(200).json((req as any).user);
    }
    catch (error) {
        console.log("Error in checkAuth controller (auth.controllers.ts: )", (error as Error).message);
        return res.status(500).json({message: "Internal server error"})
    }
}