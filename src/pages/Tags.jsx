import React, { useState, useEffect } from "react";
import Base from "../Base/Base";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const Tags = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login", { replace: true });
    }
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "https://stackoverflow-sanjaikannan.onrender.com/tags/tags",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"), // Replace with your token retrieval logic
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTags(data);
        } else {
          setError("Failed to fetch tags");
        }
      } catch (error) {
        setError("Error fetching tags: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <Base>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left side (Content) */}
          <Grid item xs={12} sm={6}>
            <div>
              <br />
              <br />
              <Typography variant="h4">Tags</Typography>
              <br />
              <br />
              <Typography>
                A tag is a keyword or label that categorizes your question with
                other, similar questions. Using the right tags makes it easier
                for others to find and answer your question.
              </Typography>
            </div>
          </Grid>

          {/* Right side (Tags) */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              {tags.map((tag, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <br />
                  <br />
                  <Paper
                    elevation={20}
                    sx={{
                      textAlign: "center",
                      padding: "10px",
                      cursor: "pointer",
                      borderRadius: 0,
                    }}
                  >
                    <Typography>{tag}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default Tags;
