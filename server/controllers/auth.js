import db from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const collectionUsers = db.collection("users");

export const postRegister = async (req, res) => {
    let val = req.body;

    let find = await collectionUsers.findOne({ username: val.username });
    let find1 = await collectionUsers.findOne({ email: val.email })

    if (find === null && find1 == null) {
        bcrypt.hash(val.password, 10, (err, resu) => {
            if (err) {
                console.log(err);
            }
            collectionUsers.insertOne({
                username: val.username,
                email: val.email,
                password: resu,
            });
            console.log("inserted successfully");
            res.json("registered successfully").status(200);
        });
    } else {
        if (find !== null) {
            res.status(409).json("username already taken");
        } else if (find1 !== null) {
            res.status(409).json("account with this email already exits");
        }
    }
}

export const postLogin = async (req, res) => {
    let val = req.body;

    try {
        let user = await collectionUsers.findOne({ username: val.username });

        if (!user) {
            return res.status(404).json("User not found");
        }

        bcrypt.compare(val.password, user.password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Internal Server Error");
            }

            if (result) {
                const token = jwt.sign({id: user._id},"secretKey");

                let {password, ...others} = user;

                return res.status(200)
                .cookie("accessToken",token,{httpOnly: true,maxAge: 60 * 60 * 60 * 24})
                .json(others);
            } else {
                return res.status(401).json("Incorrect password");
            }
        });



    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};

export const postLogout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite: "none"
    }).status(200).json("user has been logged out");
}