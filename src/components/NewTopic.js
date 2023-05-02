import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function NewTopic({ userData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [author, setAuthor] = useState(userData.name);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);

  // Custom validation functions
  const validateTitle = () => {
    if (title.trim() === "") {
      setTitleError("Title cannot be empty.");
      return false;
    } else {
      setTitleError(null);
      return true;
    }
  };

  const validateDescription = () => {
    if (description.trim() === "") {
      setDescriptionError("Description cannot be empty.");
      return false;
    } else {
      setDescriptionError(null);
      return true;
    }
  };



  // Custom validation function to ensure vehicles array is not empty


  async function handleSubmit(e) {
    e.preventDefault();

    // Call all the custom validation functions
    const isTitleValid = validateTitle();
    const isDescriptionValid = validateDescription();

    if (
      !isTitleValid ||
      !isDescriptionValid
    ) {
      return;
    }

    const newTopic = {
      title,
      description,
      likes,
      dislikes,
      posts: [],
      author,

    };
    console.log("New topic data:", newTopic);
    
    try {
      const response = await api.post("/topics", newTopic);
      console.log("Response:", response); // Add this line to log the response
      navigate(`/topic/${response.data._id}`);
    } catch (error) {
      console.error("Error creating new topic:", error);
    }
  }

  return (
    <div className="new-topic p-4">
      <h2 className="text-xl mb-4">สร้างหัวข้อใหม่</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            หัวข้อ:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          {titleError && (
            <p className="text-red-600 text-sm mt-2">{titleError}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            รายละเอียด:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 h-32 border border-gray-300 rounded"
          ></textarea>
          {descriptionError && (
            <p className="text-red-600 text-sm mt-2">{descriptionError}</p>
          )}
        </div>


        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          สร้างหัวข้อ
        </button>
      </form>
    </div>
  );
}

export default NewTopic;
