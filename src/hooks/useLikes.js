import { useState } from "react";

function useLikes(initialLikes = 0, initialDislikes = 0) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  function handleLike() {
    setLikes(likes + 1);
  }

  function handleDislike() {
    setDislikes(dislikes + 1);
  }

  return { likes, dislikes, handleLike, handleDislike };
}

export default useLikes;
