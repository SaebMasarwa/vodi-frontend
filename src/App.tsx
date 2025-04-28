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
import MovieDisplay from "./routes/MovieDisplay";
import Movies from "./routes/Movies";
import Footer from "./components/Footer";
import MovieCategory from "./routes/MovieCategory";
import AddMovie from "./routes/AddMovie";
import FavMovies from "./routes/FavMovies";
import Dashboard from "./routes/Dashboard";

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
              <Route path="/movie/:id" element={<MovieDisplay />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/genre/:genre" element={<MovieCategory />} />
              <Route path="/addmovie" element={<AddMovie />} />
              <Route path="/favmovies" element={<FavMovies />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
