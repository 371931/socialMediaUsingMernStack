import React,{useContext} from 'react';
import {myContext} from "../../App.js";
import "./Comments.css";
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";

export default function Comments() {

    const {mode} = useContext(myContext);

    return (
        <div className='comments'>
            <div className="type">
                <Avatar sx={{ width: 25, height: 25 }} />
                <input type="text" placeholder='write a comment' name="comment" />
                <button>send</button>
            </div>
            <div className="comment">
                <Link to="/profile/jhonjoe" style={{ textDecoration: "none", color: !mode ? "white" : "black", outline: "none" }}>
                <div className="comAva"><Avatar sx={{ width: 25, height: 25 }} /></div>
                </Link>
                <div className="comSec">
                    <Link to="/profile/jhonjoe" style={{ textDecoration: "none", color: !mode ? "white" : "black", outline: "none", fontWeight:"600", fontSize:"14px" }}>
                    <div className="name">Jhon Joe</div>
                    </Link>
                    <div className="comComment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut magni nisi quaerat porro, a repellendus?</div>
                </div>
                <div className='time'>1 hour ago</div>
            </div>
        </div>
    )
}
