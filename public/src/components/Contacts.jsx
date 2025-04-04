import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/mainlogo.svg"; // Import your logo here

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    async function fetchData() {
      const storedUser = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setCurrentUserName(userData.username);
        setCurrentUserImage(userData.avatarImage); // Avatar is stored persistently
      }
    }
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const redirectToProfile = () => {
    navigate("/profile"); // Redirect to profile page
  };

  // Helper function to get valid avatar URL
  const getAvatarSrc = (avatar) => {
    if (!avatar) return ""; // Prevent broken images
    return avatar.startsWith("data:image")
      ? avatar // Use directly if Base64
      : avatar; // Otherwise, assume it's a valid URL
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>MEET</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img src={getAvatarSrc(contact.avatarImage)} alt="avatar" />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          {/* Make the current user clickable */}
          <div
            className="current-user"
            onClick={redirectToProfile}
            style={{ cursor: "pointer" }}
          >
            <div className="avatar">
              <img src={getAvatarSrc(currentUserImage)} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #3533cd;
  .brand {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: rgba(21, 5, 5, 0.38);
      min-height: 3rem;
      cursor: pointer;
      width: 90%;
      border-radius: 3rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2rem;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #08080b;
    }
  }

  .current-user {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 3rem;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
        border-radius: 50%;
      }
    }
    .username {
      h2 {
        color: #3533cd;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
