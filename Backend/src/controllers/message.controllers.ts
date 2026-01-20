import type { RequestHandler } from "express"
import User from "../models/user.model.ts"
import Message from "../models/message.model.ts"
import cloudinary from "../lib/cloudinary.ts";

export const getUsersForSideBar: RequestHandler = async (req, res) => {

    try {

        const loggedInId = (req as any).user._id;

        /** .find()
         *  -> The outer {} denotes the object being passed to find as the query.
         *  -> Inside, _id: { $ne: loggedInId } is a key-value pair.
         */
        const filteredUsers = await User
            .find({ _id: { $ne: loggedInId } }) // { _id: { $ne: loggedInId } } aka.query = object describing conditions on fields
            .select("-password") // return all fields except for password
        res.status(200).json(filteredUsers)
    } catch (error) {

        console.log("Error: in getUsersForSideBar controller: ", (error as Error).message)
        return res.status(500).json("Internal Server Error");
    }
}

export const getMessages: RequestHandler = async (req, res) => {

    try {
        const { id: otherUserId } = req.params; // getting other user's id
        const myId = (req as any).user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: otherUserId },
                { senderId: otherUserId, recieverId: myId }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {

        console.log("Error in getMessages controller: ", (error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessage: RequestHandler = async (req, res) => {

    try {

        const { id: recieverId } = req.params; // id from the url
        const senderId = (req as any).user._id; // comes from protectRoute middleware that ran before this controller.
        const { text, image } = req.body;

        let imageUrl;
        if (image) {
            // Uploads actual image to Cloudinary -> get url to that image -> store url inside mongoDB
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        // TODO: realtime functionality goes here using socket.io
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller: ", (error as Error).message)
        res.status(500).json({error: "Internal Server Error"})
    }
}