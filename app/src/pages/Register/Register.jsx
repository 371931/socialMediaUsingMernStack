import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [imgsrc, upSrc] = useState("./assets/images/password-hide.svg");
    const [passCheck, upCheck] = useState(true);
    const [inputType, upInput] = useState("password");

    const [imgsrc2, upSrc2] = useState("./assets/images/password-hide.svg");
    const [passCheck2, upCheck2] = useState(true);
    const [inputType2, upInput2] = useState("password");

    const [details, upDetails] = useState({
        username: "",
        email: "",
        password: "",
        comfirmPassword: "",
    });

    const [err,upErr] = useState(null);

    function passEyeOncli() {
        upCheck(passCheck ? false : true);
        upSrc(passCheck ? "./assets/images/password-show.svg" : "./assets/images/password-hide.svg");
        upInput(passCheck ? "text" : "password");
    }

    function passEyeOncli2() {
        upSrc2(passCheck2 ? "./assets/images/password-show.svg" : "./assets/images/password-hide.svg");
        upCheck2(passCheck2 ? false : true);
        upInput2(passCheck2 ? "text" : "password");
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (details.username === "" || details.email === "" || details.password === "" || details.comfirmPassword === "") {
            alert("Enter all fields");
        }else{
            if (details.password == details.comfirmPassword) {
                try{
                let response = await axios.post("http://localhost:3001/auth/register", details);
                upErr(null);
                upDetails(
                    {username: "",
                    email: "",
                    password: "",
                    comfirmPassword: "",}
                );
                navigate("/login");
                }catch(err){
                    console.log(err);
                    if(err.response.data){
                        upErr(err.response.data);
                    }
                }
            } else {
                alert("Passwords did not Match")
            }
        }
    }

    function onChaDetails(e) {
        let { name, value } = e.target;

        upDetails((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    return (
        <div className="container">
            <div className="card">
                <div className="left">
                    <h1>Register</h1>
                    <form onSubmit={onSubmit} method="post">
                        <input type="text" name="username" placeholder="Username" autoFocus onChange={onChaDetails} value={details.username} />
                        <input type="email" name="email" placeholder="Email" autoFocus onChange={onChaDetails} value={details.email} />
                        <div>
                            <input type={inputType} name="password" placeholder="Password" onChange={onChaDetails} value={details.password} />
                            <img src={imgsrc} onClick={passEyeOncli} />
                        </div>
                        <div>
                            <input type={inputType2} name="comfirmPassword" placeholder="Confirm Password" onChange={onChaDetails} value={details.comfirmPassword} />
                            <img src={imgsrc2} onClick={passEyeOncli2} />
                        </div>
                        {err && err}
                        <button>Register</button>
                        <Link to="/login" className="but1">
                            <button className="button">Login</button>
                        </Link>
                    </form>
                </div>
                <div className="right">
                    <h1>Hello world!</h1>
                    <p>Reconnect and Ignite: Every Login Sparks New Social Connections, Unveiling Your Ever-Growing Hub!</p>
                    <Link to="/login" className="but">
                        <button className="button">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;