import React, { useState, useEffect } from "react";
import Base from "../Base/Base";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Check for the presence of a valid token in a useEffect hook
    if (!token) {
      Navigate("/Login");
    }
  }, [token, Navigate]);

  const handleAddQuestion = async () => {
    if (!questionTitle || !questionBody || !questionTags) {
      setError("Please enter the question title, question body, and tags.");
      return;
    }

    try {
      const response = await fetch(
        "https://stackoverflow-sanjaikannan.onrender.com/questions/Ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            questionTitle,
            questionBody,
            questionTags: questionTags.split(",").map((tag) => tag.trim()),
          }),
        }
      );

      if (response.ok) {
        // Question added successfully, navigate to the home page
        Navigate("/Home");
      } else {
        const errorData = await response.json();
        setError("Failed to add the question: " + errorData.message);
      }
    } catch (error) {
      setError("Error adding the question: " + error.message);
    }
  };

  return (
    <Base>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Left side (Content similar to Login) */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h4">Ask a New Question!</Typography>
              <br />
              <Typography>
                Writing a good question: You are ready to ask a
                programming-related question, and this form will help guide you
                through the process. Looking to ask a non-programming question?
                See the topics here to find a relevant site.
              </Typography>
              <br />
              <Typography>
                Steps:
                <br />
                1. Summarize your problem in a one-line title.
                <br />
                2. Describe your problem in more detail.
                <br />
                3. Describe what you tried and what you expected to happen.
                <br />
                4. Add "tags" which help surface your question to members of the
                community.
                <br />
                5. Review your question and post it to the site.
              </Typography>
            </Box>
          </Grid>

          {/* Right side (Ask Question form) */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h5">Ask a Question</Typography>
              {error && (
                <Typography color="error" sx={{ my: 2 }}>
                  {error}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Question Title"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Question Body"
                value={questionBody}
                onChange={(e) => setQuestionBody(e.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                value={questionTags}
                onChange={(e) => setQuestionTags(e.target.value)}
                sx={{ my: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddQuestion}
                sx={{ bgcolor: "#F48024", color: "white", my: 2 }}
              >
                Post Question
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default AskQuestion;
