import React, { useContext, useState } from 'react';
import { myContext } from "../../App.js";
import "./Comments.css";
import Avatar from '@mui/material/Avatar';
import OgComment from './ogComment/OgComment.jsx';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';

export default function Comments(props) {

    console.log(props);

    const { mode } = useContext(myContext);
    const { currentUser } = useContext(AuthContext);

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

    console.log(data);

    const [commentDetails, upComment] = useState({
        postId: props.postId,
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
    };
    return (
        <div className='comments'>
            <div className="type">
                <Avatar sx={{ width: 25, height: 25 }} />
                <input type="text" placeholder='write a comment' name="comment" value={commentDetails.comment} onChange={onChai} />
                <button onClick={onClickAdd}>send</button>
            </div>
            {data && data.map((val) => {
                if (val.postId === props.postId) {
                    return <OgComment key={val._id} id={val._id} comment={val.comment} username={val.username} createdDate={val.createdDate} />
                }
            })}
        </div>
    );

}
