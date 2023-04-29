import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
// import { mockTopics } from "../mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faComment } from "@fortawesome/free-solid-svg-icons";
import useLikes from "../hooks/useLikes";
import useVote from "../hooks/useVote";
import RouteInfo from "./RouteInfo";

function TopicCard({ topic }) {
  const { likes, dislikes, handleLike, handleDislike } = useVote(topic.likes, topic.dislikes);
  console.log("TopicCard:", topic);
  return (
    <div className="topic-card bg-white p-4 mb-4 rounded-lg shadow-md">
     <RouteInfo start={topic.start} destination={topic.destination} vehicles={topic.vehicles} />
      <div className="flex flex-wrap gap-2">
        <Link to={`/topic/${topic._id}`} className="text-blue-600 hover:text-blue-800">
          <h2 className="text-2xl font-semibold">
            {topic.title}
          </h2>
        </Link>
      </div>
      <p className="text-gray-600 mt-2">รายละเอียด: {topic.description}</p>
      <div className="mt-1 text-sm text-gray-500 mt-3">
        <FontAwesomeIcon icon={faComment} className="mr-1" /> {topic.commentCount} ความคิดเห็น
        </div>
      <div className="flex justify-end mt-4">
        <span className="text-gray-500">สร้างโดย {topic.author}</span>
      </div>
    </div>
  );
}

function Home({ userData }) {
  //  console.log("User Profile:", userData);
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await api.get("/topics");
        // console.log("ss"+response.data)
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);
  
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredTopics = topics.filter((topic) =>
    (topic.title + " " + topic.description).toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredTopics)
  return (
    <div className="home p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700 font-display">Egma Board <span className="text-lg"> Make Your Note</span></h1>
        {userData == null?(<div></div>):(
        <Link to="/new-topic" className="bg-blue-500 text-white px-4 py-2 rounded font-display">
          สร้างหัวข้อ
        </Link>)}
      </div>
      <input
        type="text"
        placeholder="ค้นหา Keyword"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={search}
        onChange={handleSearch}
      />
      {filteredTopics.map((topic) => {
        console.log("Rendering topic:", topic);
        return <TopicCard key={topic.id} topic={topic} />;
      })}
    </div>
  );
}

export default Home;
