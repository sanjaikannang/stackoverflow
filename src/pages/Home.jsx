import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router";
import Base from "../Base/Base";

const Home = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login", { replace: true });
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://stackoverflow-sanjaikannan.onrender.com/questions/get",
          {
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErr("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [navigate]);

  const handleAskQuestion = () => {
    navigate("/AskQuestion");
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/PostAnswer/${questionId}`);
  };

  return (
    <Base>
      <Container maxWidth="md">
        <Button
          onClick={handleAskQuestion}
          variant="contained"
          style={{
            position: "absolute",
            top: "6rem",
            right: "15rem",
            backgroundColor: "#F48024",
            color: "white",
            marginTop: "1rem",
            borderRadius: "0",
          }}
        >
          Ask Question
        </Button>
        <Typography variant="h4" gutterBottom>
          TOP QUESTIONS
        </Typography>
        <List>
          {questions.map((question, index) => (
            <div key={question._id}>
              <ListItem
                button
                onClick={() => handleQuestionClick(question._id)}
              >
                <Box display="flex">
                  <Box
                    m={2}
                    p={2}
                    border="2px solid #F48024"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    flex={1}
                  >
                    <Typography variant="h6">{question.voteCount}</Typography>
                    <Typography variant="body2">Votes</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box
                    m={2}
                    p={2}
                    border="2px solid #F48024"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    flex={1}
                  >
                    <Typography variant="h6">
                      {question.answers.length}
                    </Typography>
                    <Typography variant="body2">Answers</Typography>
                  </Box>
                  <Divider
                    flexItem
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  />
                  <Box flexGrow={1} p={1}>
                    <Typography variant="h6" style={{}}>
                      {question.questionTitle}
                    </Typography>
                    <br />
                    <Typography variant="body1" style={{}}>
                      {question.questionBody}
                    </Typography>
                    <br />
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <div style={{ flex: 1 }}>
                        {question.questionTags.map((tag, tagIndex) => (
                          <Button
                            key={tagIndex}
                            variant="contained"
                            style={{
                              backgroundColor: "#FFD180",
                              color: "black",
                              marginRight: "1rem",
                              padding: "4px 8px",
                              fontSize: "11px",
                              borderRadius: "0px",
                            }}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                      <Typography variant="body2">
                        Asked on: {new Date(question.askedOn).toLocaleString()}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </ListItem>
              {index < questions.length - 1 && <Divider />}
            </div>
          ))}
        </List>
        {err && <Typography color="error">{err}</Typography>}
      </Container>
    </Base>
  );
};

export default Home;
