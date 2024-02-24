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
                let { password, ...others } = val;
                res.status(200).json(others);
            });
        } catch (err) {
            console.log(err);
        }

    } catch (err) {
        console.log(err);
    }

}

export const updateProfile = (req, res) => {
    let val = req.body;
    try {
        let token = req.cookies.accessToken;
        if (!token) return res.status(401).json("user not logged in")

        try {
            jwt.verify(token, "secretKey", async (err, result) => {

                let vali = await usersCollection.findOne({ username: val.inputs.userName });

                await usersCollection.updateOne({ username: val.inputs.userName }, {
                    $set: {
                        coverImg: val.coverImg || vali.coverImg,
                        language: val.inputs.language,
                        location: val.inputs.location,
                        name: val.inputs.name,
                        profileImg: val.profileImg || vali.profileImg,
                    }
                }, { $upsert: true });
                res.status(200).json("updates");
            });
        } catch (err) {
            console.log(err);
        }

    } catch (err) {
        console.log(err);
    }
}
