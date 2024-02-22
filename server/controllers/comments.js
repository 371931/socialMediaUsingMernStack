import moment from "moment";
import db from "../connect.js";
import jwt from "jsonwebtoken";

const collectionComments = await db.collection("comments");

export const getComments = async (req, res) => {
    try {
        let token = await req.cookies.accessToken;
        if (!token) return res.json().status(401);

        jwt.verify(token, "secretKey", async (err, result) => {
            try {
                let comments = await collectionComments.find();
                let commentArr = await comments.toArray();
                res.json(commentArr).status(200);
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const addComments = async (req, res) => {
    let val = req.body;

    try {
        let token = await req.cookies.accessToken;
        if (!token) return res.json("user not logged In").status(401);

        jwt.verify(token, "secretKey", async(err, result) => {
            if (err) return res.json(err);

            try {
                await collectionComments.insertOne({
                    postId: val.commentDetails.postId,
                    comment: val.commentDetails.comment,
                    username: val.commentDetails.username,
                    proPic: val.commentDetails.proPic,
                    createdDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                });

                console.log("inserted comment");
                res.status(200).json("addedComment");
            } catch (err) {
                console.log(err);
            }
        });
    } catch (err) {
        console.log(err);
    }
}