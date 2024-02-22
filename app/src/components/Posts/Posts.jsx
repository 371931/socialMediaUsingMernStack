import React, { useState, useContext, useEffect } from 'react';
import { myContext } from "../../App";
import "./Posts.css"
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../Comments/Comments';
import sam from "../../assets/images/sto1.jpg";
import moment from "moment";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function Posts(props) {
    const [comments, upComments] = useState(false);
    const { mode } = useContext(myContext);
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery({
        queryKey: ['likes'],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:3001/likes/getLikes?postId=${props.id}`, { withCredentials: true });
                return response.data
            } catch (err) {
                console.error(err);
                throw new Error('Failed to fetch likes');
            }
        }
    });

    let liked = data && data.some(item => item.userId === currentUser._id && item.postId === props.id);
    let [like, setLike] = useState(liked);
    
    const [likeCount,upLikeCoun] = useState(data && data.filter(val => val.postId === props.id).length);
    
    useEffect(()=>{
        setLike(data && liked);
        if (data) {
            const count = data.filter(val => val.postId === props.id).length;
            upLikeCoun(count);
        }
    },[liked,data]);
    
    let datas = {
        userId: currentUser._id,
        postId: props.id
    }

    async function onClickLike(e) {
        e.preventDefault();
        setLike(true);
        await axios.post("http://localhost:3001/likes/likePost", datas, { withCredentials: true });
        queryClient.invalidateQueries(['likes', props.id]);
    }

    async function onCliDel() {
        setLike(false);
        await axios.delete("http://localhost:3001/likes/removeLike?postId=" + props.id + "&userId=" + currentUser._id, { withCredentials: true })
        queryClient.invalidateQueries(['likes', props.id]);
    }
    return (
        <div className='posts'>
            <div className="post" style={{ backgroundColor: !mode && "#222", color: !mode && "white" }}>
                <div className="headerPost">
                    <Link to={`/profile/${props.username}`} style={{ textDecoration: "none", color: !mode ? "white" : "black", outline: "none" }}>
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
                    <div>{ like ?
                        <FavoriteOutlinedIcon style={{ fontSize: "18px", color: "red" }} onClick={onCliDel}/> :
                        <FavoriteBorderOutlinedIcon style={{ fontSize: "18px" }} onClick={onClickLike} />
                    } {likeCount} Likes</div>
                    <div onClick={() => { upComments(!comments) }}><SmsOutlinedIcon style={{ fontSize: "18px" }} /> Comments</div>
                    <div><ShareIcon style={{ fontSize: "18px" }} /> Share</div>
                </div>
                {comments && <Comments postId={props.id} />}
            </div>
        </div>
    );
}
