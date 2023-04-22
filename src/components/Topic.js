import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import Comment from "./Comment";
import RouteInfo from "./RouteInfo";
import api from "../services/api";
Modal.setAppElement("#root");

function Topic({ userData }) {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [comment, setComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [imgProfile, setimgProfile] = useState("");
  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setimgProfile(userData.imageUrl);
    }
  }, []);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/topics/${id}`);
        console.log(response);
        console.log(response.data.vehicles);
        //Set the start, destination, and vehicles state using the fetched data
        setStart(response.data.start);
        setDestination(response.data.destination);
        setVehicles(response.data.vehicles);
        setTopic(response.data);
      } catch (error) {
        console.error("Error fetching topic:", error);
      }
    };

    fetchTopic();
  }, [id]);

  if (!topic) {
    return <div></div>;
  }
async function handleCreateComment() {
  const newPost = {
    id: Math.max(...topic.posts.map((p) => p.id)) + 1,
    title: "New Comment",
    content: comment,
    likes: 0,
    dislikes: 0,
    author: name,
    imgProfile: imgProfile,
  };
  // topic.posts.push(newPost);
  setComment("");
  setModalIsOpen(false);
  try {
    const response = await api.post(`/topics/${id}/posts`, newPost); // Capture the response
    const createdComment = response.data; // Extract the created comment from the response
    setTopic({ ...topic, posts: [...topic.posts, createdComment] }); // Use createdComment instead of newPost
    setComment("");
    setModalIsOpen(false);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}
  return (
    <div className="topic p-4">
      <RouteInfo start={start} destination={destination} vehicles={vehicles} />
      <h1 className="text-2xl font-bold mb-4">
        {topic.title} By {topic.author}
      </h1>
      <p className="text-gray-700 mb-4">{topic.description}</p>
      {userData == null ? (
        <div></div>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setModalIsOpen(true)}
        >
          Add Comment
        </button>
      )}

      {topic.posts.map((post, index) => (
        <Comment key={post._id} comment={post} user={userData} />
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Comment Modal"
        className="modal-dialog w-2/5 mx-auto mt-20 p-4 border rounded shadow-lg bg-white"
      >
        <h2 className="text-xl font-bold mb-4">Add Comment</h2>
        <form>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="5"
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleCreateComment}
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Topic;
