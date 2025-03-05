import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import servers from "../environment";

export default function Authentication() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${servers}/api/v1/users/register`, {
        username,
        name,
        password,
      });
      alert("Signup Successful! Now login.");
      navigate("/auth");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Signup error";
      // Check if the error message indicates a duplicate username error
      if (errMsg === "Username already exists") {
        alert("Username already exists");
      } else {
        alert(errMsg);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${servers}/api/v1/users/login`, {
        username: loginUsername,
        password: loginPassword,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      window.location.href = "/home";
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      <LeftSide>
        <BackgroundImage
          src="https://images.unsplash.com/photo-1558685555-bcdb675f9b9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlydHVhbHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Background"
        />
      </LeftSide>
      <RightSide style={{tabSize:""}}>
        <StyledWrapper style={{height:"50%",width:"10%"}}>
          <div className="wrapper">
            <div className="card-switch">
              <label className="switch">
                <input type="checkbox" className="toggle" />
                <span className="slider" />
                <span className="card-side" />
                <div className="flip-card__inner">
                  <div className="flip-card__front">
                    <div className="title">Log in</div>
                    <form className="flip-card__form" onSubmit={handleLogin}>
                      <input
                        className="flip-card__input"
                        placeholder="username"
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                      />
                      <input
                        className="flip-card__input"
                        placeholder="Password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button type="submit" className="flip-card__btn">
                        Let&apos;s go!
                      </button>
                    </form>
                  </div>
                  <div className="flip-card__back">
                    <div className="title">Sign up</div>
                    <form className="flip-card__form" onSubmit={handleSignup}>
                      <input
                        className="flip-card__input"
                        placeholder="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        className="flip-card__input"
                        placeholder="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        className="flip-card__input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="submit" className="flip-card__btn">
                        Confirm!
                      </button>
                    </form>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </StyledWrapper>
      </RightSide>
    </Container>
  );
}

// Container now splits the page into two parts.
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

// Left side covers the remaining space with the full background image.
const LeftSide = styled.div`
  flex: 1;
  position: relative;
`;

// The background image covers the entire left side.
const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Right side is constrained to a fixed width (or percentage) to prevent it from expanding too much.
const RightSide = styled.div`
  flex: 0 0 40%;
  min-width: 350px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%; /* Increase size */
  max-width: 500px; /* Control max size */
  padding: 40px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

// Existing styles for your authentication card remain in StyledWrapper.
const StyledWrapper = styled.div`
  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
  }
  /* switch card */
  .switch {
    position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: "Log in";
    left: -70px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 600;
  }

  .card-side::after {
    position: absolute;
    content: "Sign up";
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 600;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-color);
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side:after {
    text-decoration: underline;
  }

  /* card */
  .flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .toggle:checked ~ .flip-card__front {
    box-shadow: none;
  }

  .flip-card__front,
  .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn:active,
  .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .flip-card__btn {
    margin: 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }
`;
