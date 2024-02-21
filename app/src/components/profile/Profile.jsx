import React, { useContext } from "react";
import "./Profile.css";
import axios from "axios";
import Posts from "../Posts/Posts.jsx";
import { myContext } from "../../App.js";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { AuthContext } from "../../context/authContext.js";
import { useQuery } from '@tanstack/react-query';

function Profile() {

    const { mode } = useContext(myContext);
    const {currentUser}= useContext(AuthContext);

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async() =>
          await axios.get("http://localhost:3001/post/allPosts",{withCredentials: true}).then((res) =>
            res.data,
            ).catch(err=> console.log(err))
    })

    let postOfUser = data && data.filter(val=> val.userId == currentUser._id);

    console.log(postOfUser);

    return (
        <div className="profileMain" style={{ backgroundColor: !mode && "#333", color: !mode && "white" }}>
            <img src={currentUser.coverImg} alt="" className="coverImg" />
            <div className="sec2Pro" style={{ backgroundColor: !mode && "#222", color: !mode && "white" }}>
                <img src={currentUser.profileImg} alt="" className="proPhoto" />
                <div className="icons">
                    <FacebookIcon style={{ cursor: "pointer" }} className="samue" />
                    <InstagramIcon style={{ cursor: "pointer" }} className="samue" />
                    <XIcon style={{ cursor: "pointer" }} className="samue" />
                    <LinkedInIcon style={{ cursor: "pointer" }} className="samue" />
                    <RedditIcon style={{ cursor: "pointer" }} className="samue" />
                </div>
                <div className="detailsPro" >
                    <div className="namePro">{currentUser.username}</div>
                    <div className="locationLang">
                        <div><FmdGoodIcon style={{ fontSize: "12" }} /> {currentUser.location}</div>
                        <div><LanguageIcon style={{ fontSize: "12" }} /> {currentUser.language}</div>
                    </div>
                    <button>follow</button>
                </div>
                <div className="thirDiv">
                    <EmailOutlinedIcon style={{ cursor: "pointer" }} className="rightSiders"/>
                    <MoreVertOutlinedIcon style={{ cursor: "pointer" }} className="rightSiders"/>
                </div>
            </div>
            <div className="profilePosts">
                {isPending ? "Loding" : data && (postOfUser.map(val => <Posts content={val.content} key={val._id} id={val._id} userId={val.userId}  username={val.username} postCretedDate={val.postedDate}/>))}
            </div>
        </div>
    );
}

export default Profile;