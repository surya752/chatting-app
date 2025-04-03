import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 720);

  useEffect(() => {
    async function fetchUser() {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    }
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            setContacts(data);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchContacts();
  }, [currentUser, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 720);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div
        className={`container ${
          isMobileView && currentChat ? "chat-active" : ""
        }`}
      >
        {isMobileView && currentChat ? (
          <button
            className="back-button"
            onClick={() => setCurrentChat(undefined)}
          >
            <AiOutlineArrowLeft size={24} />
          </button>
        ) : (
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        )}
        {currentChat === undefined ? (
          !isMobileView && <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(110deg, #26b3e2 60%, #2f7cc3 60%);
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    transition: all 0.3s ease-in-out;

    @media screen and (max-width: 720px) {
      grid-template-columns: 100%;
    }
  }
  .chat-active {
    grid-template-columns: 100% !important;
  }
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    z-index: 10;
  }
  .eFyvsu {
    padding: 0px 2rem;
    gap: 0.1rem;
  }
`;
