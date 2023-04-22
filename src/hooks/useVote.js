import { useState, useEffect } from "react";
import api from "../services/api";
const useVote = (initialLikes, initialDislikes, commentId) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [vote, setVote] = useState(null);
  // const [user, setUser] = useState(userData)

  // console.log("sss"+user)
  const userData = JSON.parse(localStorage.getItem('userData'));
  async function handleLike() {
    if(userData) {
      let newLikes = likes;
      if (vote === "like") {
        newLikes--;
        setVote(null);
      } else {
        newLikes++;
        if (vote === "dislike") {
          setDislikes(dislikes - 1);
        }
        setVote("like");
      }
      setLikes(newLikes);

      try {
        await api.put(`/topics/comments/${commentId}`, { likes: newLikes });
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    } else {
      alert("You must login first")
    }
  }

  async function handleDislike() {
    if(userData) {
      let newDislikes = dislikes;
      if (vote === "dislike") {
        newDislikes--;
        setVote(null);
      } else {
        newDislikes++;
        if (vote === "like") {
          setLikes(likes - 1);
        }
        setVote("dislike");
      }
      setDislikes(newDislikes);

      try {
        await api.put(`/topics/comments/${commentId}`, { dislikes: newDislikes });
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    } else {
      alert("You must login first")
    }
  }

  return { likes, dislikes, handleLike, handleDislike };
};

export default useVote;
