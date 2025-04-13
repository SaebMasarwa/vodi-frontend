import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/themeContext";
import { UserContext } from "./context/userContext";
import "./App.css";
import { User } from "./interfaces/User";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import { getCurrentUserById } from "./services/usersService";
import Login from "./routes/Login";
import Register from "./routes/Register";
import PageNotFound from "./components/PageNotFound";
import About from "./routes/About";
import Profile from "./routes/Profile";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const htmlElement = document.querySelector("html");

  const [user, setUser] = useState<User | null>(null);
  const [searchResults, setSearchResults] = useState<string | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", darkMode as unknown as string);
    if (localStorage.getItem("darkMode") === "true") {
      htmlElement?.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement?.setAttribute("data-bs-theme", "light");
    }
  };

  useEffect(() => {
    getCurrentUserById()
      .then((res) => {
        if (res) {
          setUser(res.data);
        }
      })
      .catch((err) => console.log(err));

    if (localStorage.getItem("darkMode") === "true") {
      htmlElement?.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement?.setAttribute("data-bs-theme", "light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, searchResults]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <UserContext.Provider
        value={{
          user,
          setUser,
          searchResults,
          setSearchResults,
        }}
      >
        <div className="App">
          <ToastContainer />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
