import React, { useState, useContext } from 'react';
import { myContext } from "../../App";
import "./Posts.css"
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Post from "../../assets/images/sto1.jpg";
import { Link } from "react-router-dom";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../Comments/Comments';
import sam from "../../assets/images/sto1.jpg";
import moment from "moment";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function Posts(props) {
    const [comments, upComments] = useState(false);
    const { mode } = useContext(myContext);
    const { currentUser } = useContext(AuthContext);
    const [liked,upliked] = useState(true);

    const { isPending, error, data } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            try {
                let response = await axios.get("http://localhost:3001/comment/allComments", { withCredentials: true })
                return response.data;
            } catch (err) {
                console.log(err);
            }
        }
    });

    const [commentDetails, upComment] = useState({
        postId: props.id,
        username: currentUser.username,
        proPic: "",
        comment: ""
    });

    const queryClient = useQueryClient();

    const mutation = useMutation((newPost) => {
        return axios.post("http://localhost:3001/comment/addComment", newPost, { withCredentials: true })
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comment"]);
            },
            onError: (error) => {
                console.log(error);
            },
        });

    function onClickAdd(e) {
        e.preventDefault();
        mutation.mutate({ commentDetails });

        upComment({
            postId: props.postId,
            username: props.username,
            proPic: "",
            comment: ""
        });
    }

    const onChai = (e) => {
        let { name, value } = e.target;
        upComment((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return (
        <div className='posts'>
            <div className="post" style={{ backgroundColor: !mode && "#222", color: !mode && "white" }}>
                <div className="headerPost">
                    <Link to={`/profile/${props.userId}`} style={{ textDecoration: "none", color: !mode ? "white" : "black", outline: "none" }}>
                        <div className="leftP">
                            <Avatar alt={props.username} src={sam} style={{ textDecoration: "none" }} sx={{ width: 30, height: 30 }} />
                            <div className="namePost">
                                <div className="name">{props.username}</div>
                                <div className="timeline">{moment(props.postCretedDate).fromNow()}</div>
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
                    <div>{liked ? <FavoriteOutlinedIcon style={{ fontSize: "18px", color:"red"}}/> : <FavoriteBorderOutlinedIcon style={{ fontSize: "18px" }}/> } Likes</div>
                    <div onClick={() => { upComments(!comments) }}><SmsOutlinedIcon style={{ fontSize: "18px" }} /> Comments</div>
                    <div><ShareIcon style={{ fontSize: "18px" }} /> Share</div>
                </div>
                {comments && <div className='comments'>
                    <div className="type">
                        <Avatar sx={{ width: 25, height: 25 }} />
                        <input type="text" placeholder='write a comment' name="comment" value={commentDetails.comment} onChange={onChai} />
                        <button onClick={onClickAdd}>send</button>
                    </div>
                    {data.map((val) => {
                        if (val.postId === props.id) {
                            return <Comments key={val._id} id={val._id} comment={val.comment} username={val.username} createdDate={val.createdDate}/>
                        }
                    })}
                </div>}
            </div>
        </div>
    );
}
