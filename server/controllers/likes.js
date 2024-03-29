import { ObjectId } from "mongodb";
import db from "../connect.js";
import jwt  from "jsonwebtoken";

const collectionLikes = db.collection("likes");
const collectionPost = db.collection("posts");

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
        try{
        let postId = new ObjectId(val.postId);
        let postLikes = await collectionPost.findOne({_id: postId},{likes: 1, _id: 0});
        let arrayToUp = postLikes.likes;
        arrayToUp.push(val.userId); 
        await collectionPost.updateOne({_id: postId},{$set:{likes:arrayToUp}},{$upsert: true}); 
        }catch(err){console.log(err)}
    });
}

export const removeLike = (req,res)=>{
    let userId = req.query.userId;
    let postId1 = req.query.postId;

    let token = req.cookies.accessToken;
    if(!token) return res.status(401).json("user not logged in")

    jwt.verify(token,"secretKey",async(err,result)=>{
        try{
        let postId = new ObjectId(postId1);
        let postLikes = await collectionPost.findOne({_id: postId},{likes: 1, _id: 0});
        let arrayToUp = postLikes.likes.filter(val=> !userId);
        await collectionPost.updateOne({_id: postId},{$set:{likes: arrayToUp}},{$upsert: true}); 
        }catch(err){console.log(err)}
    });
}