import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

function Login() {

    const [err,upErr] = useState(null);
    const navigate = useNavigate();

    const [imgsrc, upSrc] = useState("./assets/images/password-hide.svg");
    const [passCheck, upCheck] = useState(true);
    const [inputType, upInput] = useState("password");
    const [loginDetails, upLoginDetails] = useState({
        username: "",
        password: ""
    });
    
    let { login } = useContext(AuthContext);

    function onchi(e) {
        let { name, value } = e.target;

        upLoginDetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function passEyeOncli() {
        upSrc(passCheck ? "./assets/images/password-show.svg" : "./assets/images/password-hide.svg");
        upCheck(passCheck ? false : true);
        upInput(passCheck ? "text" : "password");
    }

    async function onSubmit(e) {
        e.preventDefault();

        try {
            await login(loginDetails);

            upLoginDetails({
                username: "",
                password: ""
            });

            upErr(null);
            navigate("/");
        } catch (err) {
            if (err.response.data === undefined) {
                upErr(err.response.data);
            }

            console.log(err);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-left">
                    <h1>Hello world!</h1>
                    <p>Join our vibrant community! Create your account now and connect with friends, share your stories, and explore endless possibilities. Your social journey begins with just a few clicks – Register and join the excitement!</p>
                    <Link className="but" to="/register">
                        <button className="button" >Register</button>
                    </Link>
                </div>
                <div className="login-right">
                    <h1>Login</h1>
                    <form onSubmit={onSubmit} method="post">
                        <input type="text" name="username" placeholder="Username" autoFocus onChange={onchi} value={loginDetails.username} />
                        <div>
                            <input type={inputType} placeholder="password" name="password" onChange={onchi} value={loginDetails.password} />
                            <img src={imgsrc} onClick={passEyeOncli} />
                        </div>
                        {err && err}
                        <button>Login</button>
                        <Link className="but1" to="/register">
                            <button className="button" >Register</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;