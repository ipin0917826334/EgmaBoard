import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Board from "./components/Board";
import NewTopic from "./components/NewTopic";
import { useState } from "react";
// import { mockTopics, addNewTopic } from "./mockData";

function App() {
  // const [topics, setTopics] = useState(mockTopics);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const onLoginSuccess = (response) => {
    setIsLoggedIn(true);
    setUserProfile(response.profileObj);
  };

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen font-display">
        <Header
          isLoggedIn={isLoggedIn}
          userProfile={userProfile}
          onLoginSuccess={onLoginSuccess}
          onLogoutSuccess={onLogoutSuccess}
        />
        <main className="container mx-auto flex-grow">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home userProfile={userProfile} userData={userData} />}
            />
            <Route
              exact
              path="/new-topic"
              element={<NewTopic userData={userData} />}
            />
            <Route path="/topic/:id" element={<Board userData={userData} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
