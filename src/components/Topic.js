import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import Comment from "./Comment";
import api from "../services/api";
import AWS from "aws-sdk";
Modal.setAppElement("#root");

function Topic({ userData }) {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [comment, setComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imgProfile, setimgProfile] = useState("");
  const [addImageModalIsOpen, setAddImageModalIsOpen] = useState(false);

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
      // console.log(response.data.vehicles);

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
  async function handleUploadImage(event) {
    event.preventDefault();
    if (!image) return;
    const config = {
      bucketName: "egmacs",
      region: "us-east-1",
      accessKeyId: "ASIA3L4S2WA53UMK3AVL",
      secretAccessKey: "cywM/eDgy8kb/8P4MNLy5imbTq2wglRIh0aKMNVq",
      sessionToken: "FwoGZXIvYXdzENn//////////wEaDCQFAu7aCKxQXsKN+CLIAVYGFnC37e9YnKW3Box8txyhCy2wjyOIeimYkpNOcNcFdvG/DNW3ZPJ+NW/rGwOYGZqVfemhJ6yyOCkXjowS5Ef8Z2coh+HoRYETdY/NjhyMHFD4OvpKDCePBlVTTaKoKc6SyE6Pi/Kw/tHWqrIj5TenpVAEjckNIq8w7jXeODgL9Cc7kUUBfjeFztvFwPiQoe3Jyx4RtUA7JQOGfWfsJBcBOFnwpPq2eYs5DjVDCO57tU/6Do32wMc0vC02eOIR1A44221ZW0fdKIeSyKIGMi0Pz+Fr1+Zte7vyBG9kR09Ak2VPBr9dCmKcmh09qoLG3MYj2VZAu7ZGkqI7MoQ=",
      s3Url: "https://egmacs.s3.amazonaws.com", // Optional
    };
    const s3 = new AWS.S3(config);
    const params = {
      Bucket: 'egmacs',
      Key: 'images/' + image.name,
      ContentType: image.type,
      Body: image
    };

    try {
      const data = await s3.putObject(params).promise();
      console.log("Image uploaded successfully:", data);
      setImage(null);
      setAddImageModalIsOpen(false);
      //  console.log(image.name)
      const url = "https://egmacs.s3.amazonaws.com/images/" + image.name;
      handleCreateComment(url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  async function handleCreateComment(imageUrl) {
    const newPost = {
      id: Math.max(...topic.posts.map((p) => p.id)) + 1,
      title: "New Comment",
      content:comment,
      image: imageUrl,
      likes: 0,
      dislikes: 0,
      author: name,
      imgProfile: imgProfile,
    };
    // topic.posts.push(newPost);
    setComment("");
    setModalIsOpen(false);
    try {
      const response = await api.post(`/topics/${id}/posts`, newPost);
      const createdComment = response.data;
      setTopic({ ...topic, posts: [...topic.posts, createdComment] });
      setComment("");
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  return (
    <div className="topic p-4">
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
      {userData == null ? (
        <div></div>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-3"
          onClick={() => setAddImageModalIsOpen(true)}
        >
          Add Image
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
              onClick={() => handleCreateComment(image)}
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
      <Modal
        isOpen={addImageModalIsOpen}
        onRequestClose={() => setAddImageModalIsOpen(false)}
        contentLabel="Add Image Modal"
        className="modal-dialog w-2/5 mx-auto mt-20 p-4 border rounded shadow-lg bg-white"
      >
        <h2 className="text-xl font-bold mb-4">Add Image</h2>
        <form>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={(event) => handleUploadImage(event)} // Pass the event here
            >
              Upload
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setAddImageModalIsOpen(false)}
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
