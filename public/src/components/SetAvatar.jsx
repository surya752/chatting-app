import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.svg";
import axios from "axios";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [avatarModel, setAvatarModel] = useState(
    localStorage.getItem("selectedAvatarModel") || "bottts" // Load saved model
  );

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAvatars = () => {
      setIsLoading(true);
      let avatarUrls = [];
      for (let i = 0; i < 6; i++) {
        const id = Math.round(Math.random() * 1000);
        avatarUrls.push(
          avatarModel === "robohash"
            ? `https://robohash.org/${id}.png`
            : avatarModel === "ui-avatar"
            ? `https://ui-avatars.com/api/?name=User${id}&background=random`
            : `https://api.dicebear.com/7.x/${avatarModel}/svg?seed=${id}`
        );
      }
      setAvatars(avatarUrls);
      setSelectedAvatar(undefined);
      setIsLoading(false);
    };

    fetchAvatars();
  }, [avatarModel]);

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setAvatarModel(selectedModel);
    localStorage.setItem("selectedAvatarModel", selectedModel); // Save model in localStorage
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    try {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    } catch (error) {
      toast.error("Network error. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <h1>Choose an avatar 🎭 for your profile picture 📷!</h1>
          <div className="title-container">
            <select value={avatarModel} onChange={handleModelChange}>
              {[
                "adventurer",
                "adventurer-neutral",
                "avataaars",
                "avataaars-neutral",
                "big-ears",
                "big-ears-neutral",
                "big-smile",
                "bottts",
                "croodles",
                "croodles-neutral",
                "fun-emoji",
                "identicon",
                "lorelei",
                "micah",
                "miniavs",
                "notionists",
                "notionists-neutral",
                "pixel-art",
                "pixel-art-neutral",
                "shapes",
                "thumbs",
                "robohash",
                "ui-avatar",
              ].map((model) => (
                <option key={model} value={model}>
                  {model.replace("-", " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={avatar} alt={`Avatar ${index}`} />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

// Styled Components for UI
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: linear-gradient(110deg, #26b3e2 60%, #2f7cc3 60%);
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  h1 {
    color: white;
  }
  select {
    background-color: #2f7cc3;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
        border-radius: 50%;
      }

      &:hover {
        transform: scale(1.1);
      }
    }

    .selected {
      border: 0.4rem solid #2f7cc3;
    }
  }

  .submit-btn {
    background-color: #2f7cc3;
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
      background-color: #26b3e2;
    }
  }
`;
