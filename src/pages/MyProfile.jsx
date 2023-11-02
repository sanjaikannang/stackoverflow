import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Box,
  Divider,
} from "@mui/material";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    about: "",
  });
  const userId = localStorage.getItem("userId");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
      return;
    }

    // Fetch user profile
    fetch("https://stackoverflow-sanjaikannan.onrender.com/user/profile", {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });

    // Fetch user's questions
    fetch("https://stackoverflow-sanjaikannan.onrender.com/user/questions", {
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching user questions:", error);
      });
  }, [navigate, userId]);

  const handleDeleteQuestion = (questionId) => {
    const token = localStorage.getItem("token");

    // Send a request to delete the question with the given questionId
    fetch(
      `https://stackoverflow-sanjaikannan.onrender.com/questions/delete/${questionId}`,
      {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // Question deleted successfully, update the state
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question._id !== questionId)
          );
        } else {
          // Handle error
          console.error("Error deleting question");
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    // Send a request to update the user's profile
    try {
      const response = await fetch(
        `https://stackoverflow-sanjaikannan.onrender.com/user/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        setUpdateSuccess(true);
        setIsEditing(false);
      } else {
        // Handle the error
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <Base>
      <Container maxWidth="md">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            My Profile
          </Typography>
          <br />
          <br />
          <Paper elevation={20} style={{ borderRadius: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <br />
              <Typography>Name: {user.name}</Typography>
              <br />
              <Typography>About: {user.about}</Typography>
              <br />
              {!isEditing ? (
                <Button
                  style={{
                    backgroundColor: "#F48024",
                    color: "white",
                    padding: "4px 8px",
                    fontSize: "11px",
                    borderRadius: 0,
                  }}
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <TextField
                    type="text"
                    label="Name"
                    value={updatedUser.name}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        name: e.target.value,
                      })
                    }
                  />
                  <br />
                  <br />
                  <TextField
                    type="text"
                    label="About"
                    value={updatedUser.about}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        about: e.target.value,
                      })
                    }
                  />
                  <br />
                  <br />
                  <Button
                    style={{
                      backgroundColor: "#F48024",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "11px",
                      borderRadius: "0",
                    }}
                    onClick={handleUpdateProfile}
                  >
                    Update Profile
                  </Button>
                </>
              )}
              {updateSuccess && (
                <Typography variant="body1">
                  Profile updated successfully.
                </Typography>
              )}
            </div>
            <br />
          </Paper>
        </Grid>
        <br />
        <br />
        <Paper
          elevation={20}
          style={{
            maxWidth: "md",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 0,
          }}
        >
          <Typography variant="h6" align="center">
            My Questions
          </Typography>
          <br />
          {questions.map((question, index) => (
            <div key={question._id}>
              <Divider />
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Typography>{question.questionTitle}</Typography>
                </div>
                <div>
                  <Button
                    style={{
                      backgroundColor: "#F48024",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "11px",
                      borderRadius: 0,
                      margin: "8px",
                    }}
                    onClick={() => handleDeleteQuestion(question._id)}
                  >
                    Delete Question
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Divider />
        </Paper>
      </Container>
    </Base>
  );
};

export default MyProfile;
