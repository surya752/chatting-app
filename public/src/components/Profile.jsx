import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

export default function Profile() {
  const [user, setUser] = useState({ username: "", avatar: "", email: "" });
  const navigate = useNavigate();

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
    } else {
      navigate("/login"); // Redirect if no user is found
    }
  }, [navigate]);

  return (
    <Container>
      <form>
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
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(110deg, rgb(0, 0, 0) 39.71%, #3533cd 90.36%);

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    padding: 3rem;
    border-radius: 1rem;
    gap: 1rem;
    width: 100%;
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
      color: #3533cd;
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
      width: 100%;
      padding: 0.8rem;
    }

    button {
      padding: 0.5rem;
      background: #3533cd;
      color: white;
      border: none;
      cursor: pointer;
    }
  }
  form {
    display: flex;
    background-color: rgba(3, 1, -2, 0.5);
    border-radius: 1rem;
    input {
      background-color: transparent;
      padding: 0.8rem;
      border: 0.1rem solid #3533cd;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #3533cd;
        outline: none;
      }
    }
    button {
      background-color: #3533cd;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #3533cd;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #3533cd;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
