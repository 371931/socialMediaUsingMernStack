import React, { useContext, useState } from "react";
import "./NavBar.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Avatar from '@mui/material/Avatar';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function NavBar() {

    const {currentUser} = useContext(AuthContext);
    const { mode, updateMode } = useContext(myContext);
    const [searchMobile,upSearchMobile] = useState(false);

    function onCliFocus() {
        document.querySelector("#searchBar").focus();
    }

    function onCliMobi(){
        upSearchMobile(!searchMobile);
        document.querySelector("#searchBarMobi").focus();
    }

    function onClickMode(moder) {
        if (moder == "dark") {
            updateMode(false);
            document.querySelector("body").style.backgroundColor = "#222";
        } else {
            updateMode(true);
            document.querySelector(".nav").style.backgroundColor = "#222";
        }
    }

    const cur = { cursor: "pointer"};

    return (
        <div className="nav" style={{backgroundColor: !mode && "#222",color: !mode && "white"}}>
            <div className="nav-left">
                <Link to="/" style={{textDecoration:"none",color:!mode ? "white" : "black"}} >
                <div className="appName">LevelUp</div>
                </Link>
                <Link to="/" style={{textDecoration:"none",color:!mode ? "white" : "black"}} >
                <HomeOutlinedIcon style={cur} />
                </Link>
                {mode ? <LightModeOutlinedIcon onClick={() => { onClickMode("dark") }} style={cur} /> : <DarkModeOutlinedIcon onClick={() => { onClickMode("sun") }} style={cur} />}
                <GridViewIcon style={cur} />
                <div className="search">
                    <div className="searchMobile">
                    <SearchOutlinedIcon onClick={onCliMobi} className="icon" style={{border:"1px solid black",borderColor: !mode && "#555"}} />
                    <input type="text" name="serach" id="searchBarMobi" placeholder="search..." style={{backgroundColor: !mode && "#222",color: !mode && "white",borderColor: !mode && "#555",visibility: searchMobile ? "visible" : "hidden"}} />
                    </div>

                    <div className="searchLaptop">
                    <SearchOutlinedIcon onClick={onCliFocus} className="icon searchLaptop" style={cur} />
                    <input type="text" name="serach" id="searchBar" placeholder="search..." style={{backgroundColor: !mode && "#222",color: !mode && "white",borderColor: !mode && "#555"}} />
                    </div>
                </div>
            </div>
            <div className="nav-right">
                <PersonOutlineOutlinedIcon style={cur} />
                <EmailOutlinedIcon style={cur} />
                <NotificationsNoneOutlinedIcon style={cur}/>
                
                <div style={cur} className="proNamehider" ><Link to={`/profile/${currentUser.username}`} style={{textDecoration:"none",color:!mode ? "white" : "black"}} ><Avatar />{currentUser.username}</Link></div>
            </div>
        </div>
    );
}

export default NavBar;