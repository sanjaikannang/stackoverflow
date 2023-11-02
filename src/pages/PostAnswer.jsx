import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Base from "../Base/Base";
import { useParams } from "react-router-dom";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";

const PostAnswer = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [question, setQuestion] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    // Fetch the question data and vote count
    fetch(`https://stackoverflow-sanjaikannan.onrender.com/questions/get`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch question data.");
        }
      })
      .then((data) => {
        // Find the question with the matching ID
        const selectedQuestion = data.find((q) => q._id === questionId);
        if (selectedQuestion) {
          setQuestion(selectedQuestion);
          setVoteCount(selectedQuestion.voteCount);
          setVoted(
            selectedQuestion.upVote.includes(localStorage.getItem("userId")) ||
              selectedQuestion.downVote.includes(localStorage.getItem("userId"))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching question data:", error);
        setError("Error fetching question data. Please try again.");
      });
  }, [questionId]);

  const handlePostAnswer = () => {
    if (!answer || !questionId) {
      setErrorMessage("Please provide an answer!");
      return;
    }

    // Create a new answer object
    const newAnswer = {
      answerBody: answer,
    };

    // Send a POST request to post the answer
    fetch(
      `https://stackoverflow-sanjaikannan.onrender.com/answer/post/${questionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newAnswer),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Answer posted successfully, clear the answer field and show a success message
          setAnswer("");
          setSuccessMessage("Answer posted successfully!");
          setErrorMessage(null); // Clear any previous error message
        } else {
          // Handle errors, e.g., show an error message
          setErrorMessage("Failed to post answer. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error posting answer:", error);
        // Handle errors, e.g., show an error message
        setErrorMessage("Error posting answer. Please try again.");
      });
  };

  const handleVote = (voteType) => {
    if (!voted) {
      // Send a PATCH request to register the vote
      fetch(
        `https://stackoverflow-sanjaikannan.onrender.com/questions/vote/${questionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ value: voteType }),
        }
      )
        .then((response) => {
          if (response.ok) {
            // Vote registered successfully, update the vote count and set voted to true
            setVoteCount(voteType === "upVote" ? voteCount + 1 : voteCount - 1);
            setVoted(true);

            if (voteType === "upVote") {
              alert(
                `You successfully upvoted this question. Current vote count: ${
                  voteCount + 1
                }`
              );
            } else {
              alert(
                `You successfully downvoted this question. Current vote count: ${
                  voteCount - 1
                }`
              );
            }
          } else {
            // Handle errors, e.g., show an error message
            setErrorMessage("Failed to vote. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error voting:", error);
          // Handle errors, e.g., show an error message
          setErrorMessage("Error voting. Please try again.");
        });
    } else {
      alert("You have already voted for this question.");
    }
  };

  return (
    <Base>
      <Container maxWidth="md">
        <Paper
          elevation={20}
          style={{ padding: 8, marginBottom: 16, borderRadius: 0 }}
        >
          <Grid container alignItems="center">
            <Grid item xs={12} md={3}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IconButton
                  variant="contained"
                  onClick={() => handleVote("upVote")}
                  disabled={voted}
                  style={{
                    backgroundColor: "#F48024",
                    color: "white",
                  }}
                >
                  {voted ? (
                    <ArrowDropUpSharpIcon style={{ fontSize: 30 }} />
                  ) : (
                    <ArrowDropUpSharpIcon style={{ fontSize: 30 }} />
                  )}
                </IconButton>
                <Typography variant="h6">
                  {question && question.voteCount}
                </Typography>
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleVote("downVote")}
                  disabled={voted}
                  style={{
                    backgroundColor: "#F48024",
                    color: "white",
                  }}
                >
                  {voted ? (
                    <ArrowDropDownSharpIcon style={{ fontSize: 30 }} />
                  ) : (
                    <ArrowDropDownSharpIcon style={{ fontSize: 30 }} />
                  )}
                </IconButton>
              </div>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            />

            <Grid item xs={12} md={8} style={{ marginLeft: 16 }}>
              <Typography variant="h5">
                {question && question.questionTitle}
              </Typography>
              <Typography variant="body1">
                {question && question.questionBody}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          elevation={20}
          style={{ padding: 16, marginBottom: 16, borderRadius: 0 }}
        >
          <Typography variant="h6">
            {question && question.answers
              ? `${question.answers.length} Answers`
              : "No Answers"}
          </Typography>
          <List>
            {question &&
              question.answers &&
              question.answers.map((answer, index) => (
                <div key={answer._id}>
                  <ListItem>
                    <Grid container spacing={4} alignItems="center">
                      <Grid item xs={12} md={11}>
                        <ListItemText
                          primary={`Answer ${index + 1}: ${answer.answerBody}`}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < question.answers.length - 1 && (
                    <Divider
                      variant="middle"
                      component="li"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                    />
                  )}
                </div>
              ))}
          </List>
        </Paper>
        <Paper elevation={20} style={{ padding: 16, borderRadius: 0 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography align="center">Post Your Answer</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                multiline
                rows={8}
                label="Your Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={handlePostAnswer}
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#F48024",
                  color: "white",
                  borderRadius: "0",
                }}
              >
                Post Answer
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {errorMessage && (
                <Typography color="error" variant="body1">
                  {errorMessage}
                </Typography>
              )}
              {successMessage && (
                <Typography color="success" variant="body1">
                  {successMessage}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Base>
  );
};

export default PostAnswer;
