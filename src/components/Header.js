import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from 'gapi-script';
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { userData, setUserData, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: "283004803380-rt4f3dl76mtevsgejd9k74factjkbuv1.apps.googleusercontent.com",
      ux_mode: 'redirect'
    });
  });

  const responseGoogle = (response) => {
    const userData = {
      id: response.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
    };

    setUserData(userData);
    setIsAuthenticated(true);

    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.reload(false);
  };

  const logout = () => {
    setUserData(null);
    setIsAuthenticated(false);

    // Remove user data from localStorage
    localStorage.removeItem("userData");
    window.location.reload(false);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const onLoginFailure = (error) => {
    console.error("Login failed:", error);
    if (error.error === "popup_closed_by_user") {
      // Show a message to the user or handle this case as needed
      alert("Login was not completed. Please try again.");
    }
  };

  return (
    <header className="header bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <NavLink exact to="/" activeClassName="text-blue-200" className="mr-4">
           <img src="/logo.png"
            alt="home"
            className="h-10 w-10 rounded-full mr-2"></img>
        </NavLink>
        {userData == null?(<div></div>):( <NavLink to="/new-topic" activeClassName="text-blue-200">
          สร้างหัวข้อ
        </NavLink>)}
      </div>

      {!isAuthenticated ? (
        <GoogleLogin
          clientId={"283004803380-rt4f3dl76mtevsgejd9k74factjkbuv1.apps.googleusercontent.com"}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : (isAuthenticated && userData && (
        <div className="flex items-center ml-4">
          <img
            src={userData.imageUrl}
            alt="Profile"
            className="h-10 w-10 rounded-full mr-2"
          />
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              {userData.name}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black">
                <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )
      )}
    </header>
  );
}

export default Header;
