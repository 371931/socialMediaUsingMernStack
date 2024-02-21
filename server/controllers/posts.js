import db from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import multer from "multer";

const collectionPost = db.collection("posts");
const collectionFollow = db.collection("followers");
export const getPosts = async (req, res) => {
    const token = req.cookies.accessToken;

    jwt.verify(token,"secretKey",async(err,result)=>{
        let allPosts = await collectionPost.find();
        let ogAllposts = await allPosts.toArray();
        let follwedId = await collectionFollow.find({followerId: result.id});
        let followedIds = await follwedId.toArray();
        let follwersIdArr = followedIds.map((val)=>{
            if(val.followerId === result.id){
                return val.followedId
            }
        });
        const postsToSend = ogAllposts.filter(post => follwersIdArr.includes(post.userId) || post.userId === result.id);
        res.json(postsToSend)
        .status(200);
    })
};

export const addPost = (req,res)=>{
    let val = req.body;
    
    console.log(val);

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("not logged in");
    
    
    jwt.verify(token, "secretKey" ,(err,result)=>{
        try{
        collectionPost.insertOne({
            username: val.postd.username,
            email: val.postd.email,
            userId: result.id,
            content: val.postd.content,
            postedDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            imgUrl: val.img || null
        });
        console.log("postAdded");
        res.json("postAdded");
        }catch(err){
            console.log(err);
            res.status(401).json("err");
        }
    });
}