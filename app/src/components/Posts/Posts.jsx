import React, { useState, useContext, useEffect } from 'react';
import { myContext } from "../../App";
import "./Posts.css"
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../Comments/Comments';
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
    const [moreShow, upShow] = useState(false);
    const [like,setLike] = useState(props.likes && props.likes.includes(currentUser._id) ? true : false);

    let datas = {
        userId: currentUser._id,
        postId: props.id
    }

    const queryClient = useQueryClient();

    async function onClickLike() {
        setLike(true);
        await axios.post("http://localhost:3001/likes/likePost", datas, { withCredentials: true });
        await props.refetchPosts();
    }

    async function onCliDel() {
        setLike(false);
        await axios.delete("http://localhost:3001/likes/removeLike?postId=" + props.id + "&userId=" + currentUser._id, { withCredentials: true });
        await props.refetchPosts();
    }

    const mutation = useMutation(() => {
        return axios.delete("http://localhost:3001/post/deletePost?postId=" + props.id, { withCredentials: true });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("posts");
        }
    },
        {
            onError: (err) => {
                console.log(err);
            }
        });

    function oncliDelPost(e) {
        e.preventDefault();
        mutation.mutate();
        upShow(!moreShow);
    }

    const { isPending: isloading, err, data: userInfo } = useQuery({
        queryKey: ['proImg'],
        queryFn: async () =>
            await axios.get("http://localhost:3001/userInfo/getProfile?userName=" + props.username, { withCredentials: true }).then((res) =>
                res.data
            ).catch(err => console.log(err))
    });

    return (
        <div className='posts'>
            <div className="post" style={{ backgroundColor: !mode && "#222", color: !mode && "white" }}>
                <div className="headerPost">
                    <Link to={`/profile/${props.username}`} style={{ textDecoration: "none", color: !mode ? "white" : "black", outline: "none" }}>
                        <div className="leftP">
                            <Avatar alt={props.username} src={`/uploads/${userInfo && userInfo.profileImg}`} style={{ textDecoration: "none" }} sx={{ width: 30, height: 30 }} />
                            <div className="namePost">
                                <div className="name">{props.username}</div>
                                <div className="timeline">{moment(props.postCretedDate).fromNow()}</div>
                            </div>
                        </div>
                    </Link>

                    {currentUser._id == props.userId && <div className="rightP">
                        <MoreHorizIcon style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => { upShow(!moreShow) }} />
                        {moreShow && <button onClick={oncliDelPost}>Delete</button>}
                    </div>}
                </div>
                <div className="postContent">{props.content}</div>
                {props.imgSrc && <img src={`/uploads/${props.imgSrc}`} alt="" className="possImg" />}
                <div className="footerPost">
                    <div>{like ?
                        <FavoriteOutlinedIcon style={{ fontSize: "18px", color: "red" }} onClick={onCliDel} /> :
                        <FavoriteBorderOutlinedIcon style={{ fontSize: "18px" }} onClick={onClickLike} />
                    } {props.likeslength && props.likeslength} Likes</div>
                    <div onClick={() => { upComments(!comments) }}><SmsOutlinedIcon style={{ fontSize: "18px" }} /> Comments</div>
                    <div><ShareIcon style={{ fontSize: "18px" }} /> Share</div>
                </div>
                {comments && <Comments postId={props.id} />}
            </div>
        </div>
    );
}
