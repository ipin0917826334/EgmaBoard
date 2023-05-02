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
      //Set the start, destination, and vehicles state using the fetched data

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
      accessKeyId: "ASIA3L4S2WA5W6KJR7VK",
      secretAccessKey: "GCLVi3ZnlbGvZZ8bIdrZ3PhQsCe44gzMTUkQaPaD",
      sessionToken: "FwoGZXIvYXdzEMb//////////wEaDDKWe3fABlW89vRK8iLIATPArmhp+vxf9kAeeoWJOuXqq6DBNaHVauaZyvmjcAw2f82pk6bjHjq4APEQigMf55QMv4SYBNNC2r6ZfxvYIAX+FGdkoXyMdJDoj4CJBoP4DewrsKg77HJgZiCZ6dwHJo2H6RIdu7sdknKYrAIo5MKMuIb33vWCug/myzyICrYB0DMLULkGGe1BxA16MTw1Zi1VlRG0SWYY3CRBvyh0E09FUyIDwwQdQtQvat+9RfVqlyyyuRsyMm/6aZWWZoS4ArWsdzMfl4ubKK78w6IGMi1BP2NQtYn1Cr2Qpbi3HPMRb7p+2NZarCbjRIfi6I6BrVd3iF5YMpid42aqceg=",
      s3Url: "https://egmacs.s3.amazonaws.com", // Optional
    };
    const s3 = new AWS.S3(config);
    // const fileName = `${Date.now()}_${image.name}`;
    // const fileType = image.type;
    const params = {
      Bucket: 'egmacs',
      Key: 'images/' + image.name,
      ContentType: image.type,
      Body: image
    };

    // s3.uploadFile(image, fileName, fileType, config)
    // .then((data) => {
    //   console.log("Image uploaded successfully:", data);
    //   setImage(null);
    //   setAddImageModalIsOpen(false);
    //   handleCreateComment(data.location); // Pass the image URL to handleCreateComment function
    // })
    // .catch((err) => {
    //   console.error("Error uploading image:", err);
    // });
    // s3.putObject(params, function (err, data) {
    //   if (err) {
    //     console.log('Error uploading image:', err);
    //   } else {
    //     console.log('Image uploaded successfully:', data);
    //     setImage(null);
    //     setAddImageModalIsOpen(false);
    //     console.log(data.Bucket)
    //     handleCreateComment(data.Location);
    //   }
    // });
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
  // async function handleCreateComment(imageUrl) {
  //   const newPost = {
  //     // id: Math.max(...topic.posts.map((p) => p.id)) + 1,
  //     title: "New Comment",
  //     content: comment,
  //     image: imageUrl, // Pass the URL of the uploaded image
  //     likes: 0,
  //     dislikes: 0,
  //     author: name,
  //     imgProfile: imgProfile,
  //   };
  
  //   // Optimistically update the state before the API call
  //   setTopic({ ...topic, posts: [...topic.posts, newPost] });
  //   setComment("");
  //   setModalIsOpen(false);
  
  //   try {
  //     const response = await api.post(`/topics/${id}/posts`, newPost);
  //     const createdComment = response.data;
  //     // Update the state with the actual data returned from the API
  //     setTopic((prevTopic) => {
  //       const updatedPosts = prevTopic.posts.map((post) =>
  //         post.id === createdComment.id ? createdComment : post
  //       );
  //       return { ...prevTopic, posts: updatedPosts };
  //     });
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //     // Revert the state change if the API call fails
  //     setTopic((prevTopic) => ({
  //       ...prevTopic,
  //       posts: prevTopic.posts.filter((post) => post.id !== newPost.id),
  //     }));
  //   }
  // }
  

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
