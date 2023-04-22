import React, { useState, useEffect } from "react";
import useVote from "../hooks/useVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ comment, userData }) => {
  const { likes, dislikes, handleLike, handleDislike } = useVote(
    comment.likes,
    comment.dislikes,
    comment._id
  );

  
  return (
    <div className="comment bg-gray-100 p-4 my-4 rounded shadow">
      <div className="flex flex-nowrap">
        <img
          src={comment.imgProfile}
          alt="Profile"
          className="h-12 w-12 rounded-full mr-2"
        />
      <p className="text-gray-700 mb-4 mt-2"><span className="font-bold">{comment.author}:</span> {comment.content}</p>
      </div>
      <div className="flex items-center mt-1 ml-14">
        <button
          className="flex items-center bg-blue-500 text-white px-2 py-1 rounded mr-2"
          onClick={handleLike}
          // disabled={disabled}
        >
          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
          Like ({likes})
        </button>
        <button
          className="flex items-center bg-red-500 text-white px-2 py-1 rounded"
          onClick={handleDislike}
          // disabled={disabled}
        >
          <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
          Dislike ({dislikes})
        </button>
      </div>
    </div>
  );
};

export default Comment;