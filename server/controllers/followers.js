import db from "../connect.js";
import jwt from "jsonwebtoken";

const collectionFollow = db.collection("followers");

export const getFollowers = (req,res)=>{
    let token = req.cookies.accessToken;
    if(!token) return res.status(401).json("user not logged in");

    try{
        jwt.verify(token,"secretKey",async(err,result)=>{
            if(err) console.log(err)

            let follwedId = await collectionFollow.find({followerId: result.id}).toArray();
            let followersToSend = follwedId.map(val=>val.followedId); 
            res.json(followersToSend).status(200);
        })
    }catch(err){
        console.log(log);
    }
}

export const postFollowers = async(req,res)=>{

    let follwedIdQ = req.query.follwedIdQ;
    let followerId = req.query.follwerId;

    let token = req.cookies.accessToken;
    if(!token){

    try{
        jwt.verify(token,"secretKey",async(err,result)=>{
            if(err) console.log(err)

            await collectionFollow.insertOne({followerId: followerId,followedId: follwedIdQ});

            res.json("Follwed").status(200);
        })
    }catch(err){
        console.log(err);
    }
}
}

export const deleteFollowers = (req,res)=>{

    let follwedIdQ = req.query.follewdIdQ;

    let token = req.cookies.accessToken;
    if(!token) return res.status(401).json("user not logged in");

    try{
        jwt.verify(token,"secretKey",async(err,result)=>{
            if(err) console.log(err)

            let follwedId = await collectionFollow.deleteOne({followerId: result.id,follewdId: follwedIdQ});
            res.json("UnFollwed").status(200);
        })
    }catch(err){
        console.log(log);
    }
}