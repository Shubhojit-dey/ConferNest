import React, { useContext, useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import withAuth from "../utils/withAuth";
import { AuthContext } from "../contexts/AuthContext";
import { TextField } from "@mui/material";

function Home() {
  const router = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    router(`/${meetingCode}`);
  };

  return (
    <div className="landingPageContainerHome">
      <nav className="navbar">
        {/* Logo / Brand */}
        <div className="navbar__logo">
          <p>Apna Video Call</p>
        </div>

        {/* Navigation Links */}
        <ul style={{marginRight:"10%", paddingRight:"5%"}} className="navbar__links">
          <li style={{color:"black"}} onClick={() => router("/history")} role="button" tabIndex={0}>
          <i style={{fontSize:"1rem"}} class="fa-solid fa-clock-rotate-left"></i>
            History
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("token");
              router("/");
            }}
            role="button"
            tabIndex={0}
            style={{color:"red", fontWeight:"bold"}}
          >
            <i style={{fontSize:"1rem", color:"red"}} className="fa-solid fa-right-from-bracket">
            </i>
            Logout
          </li>
        </ul>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div style={{ paddingTop: "6%" }} className="col-6 mt-5">
            <h1 style={{ fontSize: "350%", marginBottom: "3%", color:"black" }}>
              <span style={{ color: "#FF9839" }}>Providing</span> high quality
              <br></br>Video-Call
            </h1>
            <TextField style={{width:"50%", marginBottom:"2%"}} onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Enter Meeting Code" variant="outlined" />
            
              <StyledWrapper style={{ marginLeft: "5%" }}>
                <button onClick={handleJoinVideoCall} className="btn-17">
                  <span className="text-container">
                    <span className="text">Join Video Call</span>
                  </span>
                </button>
              </StyledWrapper>
            
          </div>
          <div className="col-6">
            <img
              style={{ width: "80%" }}
              src="media/logo3.png"
              alt="Hero Image"
              className="mb-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledWrapper = styled.div`
  .btn-17,
  .btn-17 *,
  .btn-17 :after,
  .btn-17 :before,
  .btn-17:after,
  .btn-17:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-17 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: #000;
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    font-weight: 900;
    line-height: 1.5;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
    padding: 0;
    text-transform: uppercase;
  }

  .btn-17:disabled {
    cursor: default;
  }

  .btn-17:-moz-focusring {
    outline: auto;
  }

  .btn-17 svg {
    display: block;
    vertical-align: middle;
  }

  .btn-17 [hidden] {
    display: none;
  }

  .btn-17 {
    border-radius: 99rem;
    border-width: 2px;
    padding: 0.8rem 3rem;
    z-index: 0;
  }

  .btn-17,
  .btn-17 .text-container {
    overflow: hidden;
    position: relative;
  }

  .btn-17 .text-container {
    display: block;
    mix-blend-mode: difference;
  }

  .btn-17 .text {
    display: block;
    position: relative;
  }

  .btn-17:hover .text {
    -webkit-animation: move-up-alternate 0.3s forwards;
    animation: move-up-alternate 0.3s forwards;
  }

  @-webkit-keyframes move-up-alternate {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(80%);
    }

    51% {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes move-up-alternate {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(80%);
    }

    51% {
      transform: translateY(-80%);
    }

    to {
      transform: translateY(0);
    }
  }

  .btn-17:after,
  .btn-17:before {
    --skew: 0.2;
    background: #fff;
    content: "";
    display: block;
    height: 102%;
    left: calc(-50% - 50% * var(--skew));
    pointer-events: none;
    position: absolute;
    top: -104%;
    transform: skew(calc(150deg * var(--skew))) translateY(var(--progress, 0));
    transition: transform 0.2s ease;
    width: 100%;
  }

  .btn-17:after {
    --progress: 0%;
    left: calc(50% + 50% * var(--skew));
    top: 102%;
    z-index: -1;
  }

  .btn-17:hover:before {
    --progress: 100%;
  }

  .btn-17:hover:after {
    --progress: -102%;
  }
`;

export default withAuth(Home);
