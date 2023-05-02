import React, { useState, useEffect } from "react";
import useVote from "../hooks/useVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
const Comment = ({ comment, user, onDelete }) => {
  const { likes, dislikes, handleLike, handleDislike } = useVote(
    comment.likes,
    comment.dislikes,
    comment._id
  );

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="comment bg-gray-100 p-4 my-4 rounded shadow">
      <div className="flex flex-nowrap">
        <img
          src={comment.imgProfile}
          alt="Profile"
          className="h-12 w-12 rounded-full mr-2"
        />
        <p className="text-gray-700 mb-4 mt-2"><span className="font-bold">{comment.author}:</span> {comment.content}</p>
        {comment.image && (
        <>
          <img
            src={comment.image}
            alt="Comment Image"
            className="max-h-64 object-cover mt-4 cursor-pointer"
            onClick={toggleModal}
          />
          {showModal && (
            <div
              className="fixed z-10 inset-0 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="min-h-screen px-4 text-center">
                <div
                  className="fixed inset-0 bg-gray-900 opacity-75"
                  onClick={toggleModal}
                ></div>
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-middle bg-white rounded p-4 text-left overflow-hidden shadow-xl transform transition-all w-full max-w-2xl">
                  <img
                    src={comment.image}
                    alt="Full Comment Image"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
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