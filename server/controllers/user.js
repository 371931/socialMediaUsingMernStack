import { ObjectId } from "mongodb";
import db from "../connect.js";
import jwt from "jsonwebtoken";

const usersCollection = db.collection("users");

export const getUser = (req, res) => {

    let userName = req.query.userName;

    try {
        let token = req.cookies.accessToken;
        if (!token) return res.status(401).json("user not logged in")

        try {
            jwt.verify(token, "secretKey", async (err, result) => {
                let val = await usersCollection.findOne({ username: userName });
                let {password, ...others } = val;
                res.status(200).json(others);
            });

            console.log("sent user details");
        } catch (err) {
            console.log(err);
        }

    } catch (err) {
        console.log(err);
    }

}