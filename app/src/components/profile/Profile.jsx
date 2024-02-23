import React, { useContext, useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";
import Update from "../Update/Update.jsx";

function Profile() {

    const { mode } = useContext(myContext);
    const { currentUser } = useContext(AuthContext);
    let userName = useLocation().pathname.split("/")[2];
    const [updateShow,upShow] = useState(false);

    const { isPending: isloading, err, data: userInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () =>
            await axios.get("http://localhost:3001/userInfo/getProfile?userName=" + userName, { withCredentials: true }).then((res) =>
                res.data
            ).catch(err => console.log(err))
    })

    console.log(userInfo);

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () =>
            await axios.get("http://localhost:3001/post/allPosts", { withCredentials: true }).then((res) =>
                res.data,
            ).catch(err => console.log(err))
    });

    const { isPending: loading, error: errorF, data: followData } = useQuery({
        queryKey: ['follow'],
        queryFn: async () =>
            await axios.get("http://localhost:3001/follwers/getFollwers", { withCredentials: true }).then((res) =>
                res.data,
            ).catch(err => console.log(err.response.data))
    });

    let postOfUser = data && data.filter(val => val.username == userName);

    const queryClient = useQueryClient();


    // Mutations
    const mutation = useMutation(() => {
        return axios.delete("http://localhost:3001/follwers/unFollowed?follwedIdQ="+userInfo._id,{ withCredentials: true })
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["follow"]);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const mutation1 = useMutation(() => {
        return axios.post(`http://localhost:3001/follwers/followed?follwedIdQ=${userInfo._id}&follwerId=${currentUser._id}`,{ withCredentials: true })
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["follow"]);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    async function handleFollow(e) {
        e.preventDefault();

        if(e.target.innerText === "following"){
            mutation.mutate();
        }else{
            mutation1.mutate();
        }

    }

    return (
        <div className="profileMain" style={{ backgroundColor: !mode && "#333", color: !mode && "white" }}>
            <img src={userInfo && `/uploads/${userInfo.coverImg}`} alt="" className="coverImg" />
            <div className="sec2Pro" style={{ backgroundColor: !mode && "#222", color: !mode && "white" }}>
                <img src={userInfo && `/uploads/${userInfo.profileImg}`} alt="" className="proPhoto" />
                <div className="icons">
                    <FacebookIcon style={{ cursor: "pointer" }} className="samue" />
                    <InstagramIcon style={{ cursor: "pointer" }} className="samue" />
                    <XIcon style={{ cursor: "pointer" }} className="samue" />
                    <LinkedInIcon style={{ cursor: "pointer" }} className="samue" />
                    <RedditIcon style={{ cursor: "pointer" }} className="samue" />
                </div>
                <div className="detailsPro" >
                    <div className="namePro">{userInfo && userInfo.username}</div>
                    <div className="locationLang">
                        {userInfo && userInfo.location && <div><FmdGoodIcon style={{ fontSize: "12" }} /> {userInfo && userInfo.location}</div>}
                        {userInfo && userInfo.language && <div><LanguageIcon style={{ fontSize: "12" }} /> {userInfo && userInfo.language}</div>}
                    </div>
                    {userInfo && userInfo._id !== currentUser._id ? <button onClick={handleFollow}>{followData && followData.includes(userInfo._id) ? "following" : "follow"}</button> : <button onClick={()=>{upShow(!updateShow)}}>Update</button>}
                </div>
                <div className="thirDiv">
                    <EmailOutlinedIcon style={{ cursor: "pointer" }} className="rightSiders" />
                    <MoreVertOutlinedIcon style={{ cursor: "pointer" }} className="rightSiders" />
                </div>
            </div>
            <div className="profilePosts">
                {isPending ? "Loding" : data && (postOfUser.map(val => <Posts content={val.content} key={val._id} id={val._id} userId={val.userId} username={val.username} imgSrc={val.imgUrl ? val.imgUrl : null} postCretedDate={val.postedDate} />
                ))}
            </div>
            {updateShow && <Update userInfo={userInfo} updateShow={updateShow}  upShow={upShow}/>}
        </div>
    );
}

export default Profile;