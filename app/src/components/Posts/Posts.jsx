import React,{useState,useContext} from 'react';
import {myContext} from "../../App";
import "./Posts.css"
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Post from "../../assets/images/sto1.jpg";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../Comments/Comments';
import sam from "../../assets/images/sto1.jpg";

export default function Posts(props) {
    const [comments,upComments] = useState(false);
    const {mode} = useContext(myContext);

    return (
        <div className='posts'>
            <div className="post" style={{backgroundColor: !mode && "#222",color: !mode && "white"}}>
                <div className="headerPost">
                    <Link to={`/profile/${props.userId}`} style={{ textDecoration: "none", color: !mode ? "white" :"black", outline: "none" }}>
                        <div className="leftP">
                            <Avatar alt={props.username} src={sam} style={{ textDecoration: "none" }} sx={{ width: 30, height: 30 }} />
                            <div className="namePost">
                                <div className="name">{props.username}</div>
                                <div className="timeline">a few secounds ago</div>
                            </div>
                        </div>
                    </Link>

                    <div className="rightP">
                        <MoreHorizIcon style={{ fontSize: "22px", cursor: "pointer" }} />
                    </div>
                </div>
                <div className="postContent">{props.content}</div>
                {props.imgSrc && <img src={`/uploads/${props.imgSrc}`} alt="" className="possImg" />}
                <div className="footerPost">
                    <div><FavoriteBorderIcon style={{fontSize:"18px"}} /> Likes</div>
                    <div onClick={()=>{upComments(!comments)}}><SmsOutlinedIcon style={{fontSize:"18px"}} /> Comments</div>
                    <div><ShareIcon style={{fontSize:"18px"}} /> Share</div>
                </div>
                {comments && <Comments />}
            </div>
        </div>
    );
}
