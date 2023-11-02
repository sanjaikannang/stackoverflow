import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AskQuestion from "./pages/AskQuestion";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import StackOverflow from "./pages/StackOverflow";
import MyProfile from "./pages/MyProfile";
import PostAnswer from "./pages/PostAnswer";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<StackOverflow />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="AskQuestion" element={<AskQuestion />} />
        <Route path="Tags" element={<Tags />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/PostAnswer/:questionId" element={<PostAnswer />} />
        <Route path="/MyProfile" element={<MyProfile />} />
      </Routes>
    </>
  );
}

export default App;
