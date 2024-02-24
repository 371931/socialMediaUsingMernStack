import React, { useContext, useState } from "react";
import "./Home.css";
import { myContext } from "../../App";
import Stories from "../storie/Stories";
import Posts from "../Posts/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddPost from "../addPost/AddPost";

function Home() {

    const { mode } = useContext(myContext)

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                let response = await axios.get("http://localhost:3001/post/allPosts",{withCredentials: true})
                return response.data;
            } catch (err) {
                console.log(err);
            }
        }
    });

    const [datas,updatera]  = useState(data);
    return (
        <div className="home" style={{ backgroundColor: !mode && "#333", color: !mode && "white" }} >
            <Stories />
            <AddPost />
            <div className="homePosts">
                {isPending ? "Can not Connect to Api" : data ? (data.map(val=><Posts content={val.content} key={val._id} id={val._id} userId={val.userId}  username={val.username} imgSrc={val.imgUrl ? val.imgUrl : null} postCretedDate={val.postedDate} likes={val.likes} likeslength={val.likes.length} refetchPosts={refetch}/>)) : "loading"}
            </div>
        </div>
    );
}

export default Home;