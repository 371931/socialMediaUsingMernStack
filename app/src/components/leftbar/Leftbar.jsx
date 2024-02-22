import React,{useContext} from "react";
import "./Left.css";
import Avatar from '@mui/material/Avatar';
import Friends from "../../assets/images/1.png";
import Groups from "../../assets/images/2.png";
import Market from "../../assets/images/3.png";
import Watch from "../../assets/images/4.png";
import Memories from "../../assets/images/5.png";
import Events from "../../assets/images/6.png";
import Gaming from "../../assets/images/7.png";
import Gallery from "../../assets/images/8.png";
import Videos from "../../assets/images/9.png";
import Messages from "../../assets/images/10.png";
import Fundraiser from "../../assets/images/11.png";
import Tutorials from "../../assets/images/12.png";
import Cources from "../../assets/images/13.png";
import { myContext } from "../../App";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

function Leftbar(){

    const {mode} = useContext(myContext);
    const {currentUser} = useContext(AuthContext);

    return(
        <div className="leftBar" style={{backgroundColor: !mode && "#222",color: !mode && "white"}}>
            <div className="profile"><Avatar className="profilr" /> <Link style={{textDecoration:"none", color: mode  ? "black" : "white"}} to={`/profile/${currentUser.username}`} >{currentUser.username}</Link></div>
            <div className="friends"><img src={Friends} alt="" /> Friends</div>
            <div className="group"><img src={Groups} alt="" /> Groups</div>
            <div><img src={Market} alt="" /> Marketplace</div>
            <div><img src={Watch} alt="" /> Watch</div>
            <div><img src={Memories} alt="" /> Memories</div>
            <hr className="line"/>
            <div className="leftBarHeading">Your shortcuts</div>
            <div><img src={Events} alt="" /> Events</div>
            <div><img src={Gaming} alt="" /> Gaming</div>
            <div><img src={Gallery} alt="" /> Gallery</div>
            <div><img src={Videos} alt="" /> Videos</div>
            <div><img src={Messages} alt="" /> Messages</div>
            <hr className="line"/>
            <div className="leftBarHeading">Others</div>
            <div><img src={Fundraiser} alt="" /> Fundraiser</div>
            <div><img src={Tutorials} alt="" /> Tutorials</div>
            <div><img src={Cources} alt="" /> Fundraiser</div>
        </div>
    );
}

export default Leftbar;