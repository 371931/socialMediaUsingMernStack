import React,{useContext} from 'react';
import { myContext } from "../../../App";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import moment from "moment";

export default function OgComment(props) {

    const { mode } = useContext(myContext);

  return (
    <div className="comment">
            <Link to="/profile/jhonjoe" style={{ textDecoration: "none", color: !mode ? "white" : "black", outline: "none" }}>
                <div className="comAva"><Avatar sx={{ width: 25, height: 25 }} /></div>
            </Link>
            <div className="comSec">
                <Link to="/profile/jhonjoe" style={{ textDecoration: "none", color: !mode ? "white" : "black", outline: "none", fontWeight: "600", fontSize: "14px" }}>
                    <div className="name">{props.username}</div>
                </Link>
                <div className="comComment">{props.comment}</div>
            </div>
            <div className='time'>{moment(props.createdDate).fromNow()}</div>
        </div>
  );
}
