import React, { useContext } from "react";
import "./Home.css";
import { myContext } from "../../App";
import Stories from "../storie/Stories";
import Posts from "../Posts/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddPost from "../addPost/AddPost";
import moment from "moment";

function Home() {

    const { mode } = useContext(myContext)

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                let response = await axios.get("http://localhost:3001/post/allPosts",{withCredentials: true})
                return response.data;
            } catch (err) {
                console.log(err);
            }
        }
    })

    return (
        <div className="home" style={{ backgroundColor: !mode && "#333", color: !mode && "white" }} >
            <Stories />
            <AddPost />
            <div className="homePosts">
                {isPending ? "Can not Connect to Api" : data ? (data.map(val=><Posts content={val.content} key={val._id} id={val._id} userId={val.userId}  username={val.username} imgSrc={val.imgUrl ? val.imgUrl : null} postCretedDate={val.postedDate}/>)) : "loading"}
            </div>
        </div>
    );
}

export default Home;