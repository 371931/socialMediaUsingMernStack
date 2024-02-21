import React, { useContext, useEffect, useState } from 'react';
import "./AddPost.css";
import Avatar from '@mui/material/Avatar';
import TagFriends from "../../assets/images/1.png";
import AddImg from "../../assets/images/addImg.png";
import Map from "../../assets/images/map.png";
import { AuthContext } from '../../context/authContext';
import { myContext } from "../../App";
import axios from 'axios';
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';

export default function AddPost() {

  const { currentUser } = useContext(AuthContext)
  const { mode, updateMode } = useContext(myContext);
  const [postDetails, upText] = useState({
    username: currentUser.username,
    email: currentUser.email,
    content: "",
  });

  function onChai(e) {
    e.preventDefault();

    let { name, value } = e.target;

    upText((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    });
  }

  const queryClient = useQueryClient()

  const mutation = useMutation((newPost) => {
    return axios.post("http://localhost:3001/post/addPost", newPost, { withCredentials: true })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const [file, upfile] = useState(null);

  useState(()=>{
    console.log(file);
  },[file])

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("http://localhost:3001/post/upload", formData);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function onShare(e) {
    e.preventDefault();

    let imgUrl;
    if(file) imgUrl = await upload();
    mutation.mutate({postd: postDetails, img:imgUrl});

    upText({
      username: currentUser.username,
      email: currentUser.email,
      content: "",
    });

    upfile(null);
  }

  return (
    <div className='addPostCon' style={{ backgroundColor: !mode && "#222", color: !mode && "white" }}>
      <div className='div1Add'>
        <Avatar sx={{ width: 30, height: 30 }} />
        <textarea onChange={onChai} name="content" id="contentAddPost" placeholder={`What's on your Mind ${currentUser.username} ?`} style={{ backgroundColor: !mode && "#222", color: !mode && "white" }} value={postDetails.content}></textarea>
        {file && <img src={URL.createObjectURL(file)} alt=""/>}
      </div>
      <hr />
      <div className='div2Add'>
        <ul>
          <input type="file" name="file" id="file" style={{ display: "none" }} onChange={(e)=>{upfile(e.target.files[0])}}/>
          <li><label htmlFor="file"><img src={AddImg} alt="" /> Add Image</label></li>
          <li><img src={Map} alt="" /> Add Place</li>
          <li><img src={TagFriends} alt="" /> Tag Friends</li>
        </ul>
        <button onClick={onShare}>Share</button>
      </div>
    </div>
  )
}
