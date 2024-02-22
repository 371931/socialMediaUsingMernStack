import db from "../connect.js";
import jwt  from "jsonwebtoken";

const collectionLikes = db.collection("likes");

export const getLikes = async(req,res)=>{
    
    let token = req.cookies.accessToken;
    if(!token) return res.status(401).json("user not logged in")

    jwt.verify(token,"secretKey",async(err,result)=>{
        try{
        let likes = await collectionLikes.find({});
        let likesArr = await likes.toArray();
        return res.json(likesArr).status(200);
        }catch(err){
            console.log(err);
        }
    });
};

export const likePost = (req,res)=>{
    let val = req.body;
    let token = req.cookies.accessToken;
    if(!token) return res.status(401).json("user not logged in")

    jwt.verify(token,"secretKey",async(err,result)=>{
        await collectionLikes.insertOne({
            userId: val.userId,
            postId: val.postId,
        });
    });
}

export const removeLike = (req,res)=>{
    let userId = req.query.userId;
    let postId = req.query.postId;
    let token = req.cookies.accessToken;
    if(!token) return res.status(401).json("user not logged in")

    jwt.verify(token,"secretKey",async(err,result)=>{
        await collectionLikes.deleteMany({
            userId: userId,
            postId: postId,
        });
        console.log("removed successfully");
    });
}