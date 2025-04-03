import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

export default function Profile() {
  const [user, setUser] = useState({ username: "", avatar: "", email: "" });
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (storedUser) {
      setUser({
        username: storedUser.username,
        avatar: storedUser.avatarImage,
        email: storedUser.email,
      });
    }
  }, []);

  return (
    <Container>
      <div className="profile-container">
        <div className="header">
          <button className="back-btn" onClick={() => navigate("/")}>
            ⬅ Back
          </button>
          <Logout />
        </div>
        <img src={user.avatar} alt="Avatar" className="avatar" />
        <input type="text" value={user.username} readOnly />
        <input type="email" value={user.email} readOnly />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Update</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2f7cc3;

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    gap: 1rem;
    width: 90%;
    max-width: 400px;
    position: relative;

    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: absolute;
      top: 1rem;
      left: 0;
      padding: 0 1rem;
    }

    .back-btn {
      background: none;
      border: none;
      color: #2f7cc3;
      font-size: 1rem;
      cursor: pointer;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top: 3rem;
    }

    input {
      width: 80%;
      padding: 0.5rem;
    }

    button {
      padding: 0.5rem;
      background: #26b3e2;
      color: white;
      border: none;
      cursor: pointer;
    }
  }
`;
