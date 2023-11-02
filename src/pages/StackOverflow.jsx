import React from "react";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import Base from "../Base/Base";
import { useNavigate } from "react-router";

const StackOverflow = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/Login");
  };
  return (
    <div>
      <Base>
        <div
          style={{
            background: " #EEEEEE",
            color: "#222426",
            padding: "6rem",
            margin: "0rem",
          }}
        >
          <Container>
            <Typography variant="h3" gutterBottom>
              Welcome to Stack Overflow !
            </Typography>
            <Typography variant="body1">
              Stack Overflow is the largest, most trusted online community for
              developers to learn, share their knowledge, and build their
              careers.
            </Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#F48024",
                color: "white",
                marginTop: "1rem",
              }}
              onClick={handleclick}
            >
              Get Started
            </Button>
          </Container>
        </div>

        {/* Communication Section */}
        <Container style={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>
            Upcoming Events
          </Typography>
          <Grid container spacing={9}>
            <Grid item xs={10} sm={10} md={4}>
              <Paper
                elevation={20}
                style={{
                  padding: "1rem",
                  minHeight: "100%",
                  background: " #EEEEEE",
                  marginBottom: "1rem",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  borderRadius: 0,
                }}
              >
                <Typography variant="body1">
                  Welcome! Meta Stack Exchange is intended for bugs, features,
                  and discussions that affect the whole Stack Exchange family of
                  Q&A sites.
                </Typography>

                <Typography variant="body2">11/2/2024</Typography>
                <Typography variant="body2">Location: Virtual</Typography>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3rem",
                    backgroundColor: "#F48024",
                    color: "white",
                  }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={20}
                style={{
                  padding: "1rem",
                  minHeight: "100%",
                  background: " #EEEEEE",
                  marginBottom: "1rem", // Add margin to create a gap
                  transition: "background-color 0.3s, box-shadow 0.3s", // Transition on background color and box-shadow
                }}
              >
                <Typography variant="body1">
                  Currently our deployments to MSE involve a full rebuild of the
                  entire application. That is a time consuming process and is a
                  factor in how fast we can get changes to our live sites.
                </Typography>

                <Typography variant="body2">20/1/2024</Typography>
                <Typography variant="body2">Location: Virtual</Typography>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3rem",
                    backgroundColor: "#F48024",
                    color: "white",
                    borderRadius: 0,
                  }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={20}
                style={{
                  padding: "1rem",
                  minHeight: "100%",
                  background: " #EEEEEE",
                  marginBottom: "1rem", // Add margin to create a gap
                  transition: "background-color 0.3s, box-shadow 0.3s", // Transition on background color and box-shadow
                  borderRadius: 0,
                }}
              >
                <Typography variant="body1">
                  the posting of answers created by ChatGPT and other generative
                  AI technologies is substantially harmful to the site and to
                  users who are asking questions and looking for correct
                  answers.
                </Typography>

                <Typography variant="body2">18/10/2024</Typography>
                <Typography variant="body2">Location: Virtual</Typography>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3rem",
                    backgroundColor: "#F48024",
                    color: "white",
                  }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={20}
                style={{
                  padding: "1rem",
                  minHeight: "100%",
                  background: " #EEEEEE",
                  marginBottom: "1rem", // Add margin to create a gap
                  transition: "background-color 0.3s, box-shadow 0.3s", // Transition on background color and box-shadow
                  borderRadius: 0,
                }}
              >
                <Typography variant="body1">
                  The original palette that was shared targeted a -70Lc, but we
                  have lowered that to -60Lc in light of feedback. This is much
                  closer to what was shared in round of feedback before launch.
                </Typography>

                <Typography variant="body2">30/6/2024</Typography>
                <Typography variant="body2">Location: Virtual</Typography>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3rem",
                    backgroundColor: "#F48024",
                    color: "white",
                  }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={20}
                style={{
                  padding: "1rem",
                  minHeight: "100%",
                  background: " #EEEEEE",
                  marginBottom: "1rem", // Add margin to create a gap
                  transition: "background-color 0.3s, box-shadow 0.3s", // Transition on background color and box-shadow
                  borderRadius: 0,
                }}
              >
                <Typography variant="body1">
                  the posting of answers created by ChatGPT and other generative
                  AI technologies is substantially harmful to the site and to
                  users who are asking questions and looking for correct
                  answers.
                </Typography>

                <Typography variant="body2">1/8/2025</Typography>
                <Typography variant="body2">Location: Virtual</Typography>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3rem",
                    backgroundColor: "#F48024",
                    color: "white",
                  }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={20}
                style={{
                  padding: "1rem",
                  minHeight: "100%",
                  background: " #EEEEEE",
                  marginBottom: "1rem", // Add margin to create a gap
                  transition: "background-color 0.3s, box-shadow 0.3s", // Transition on background color and box-shadow
                  borderRadius: 0,
                }}
              >
                <Typography variant="body1">
                  Welcome! Meta Stack Exchange is intended for bugs, features,
                  and discussions that affect the whole Stack Exchange family of
                  Q&A sites
                </Typography>
                <Typography variant="body2">30/11/2023</Typography>
                <Typography variant="body2">Location: Virtual</Typography>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "3rem",
                    backgroundColor: "#F48024",
                    color: "white",
                  }}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <br />
        <br />
        <br />
        {/* Contact Section */}
        <div
          style={{ background: "#EEEEEE", color: "#222426", padding: "4rem" }}
        >
          <Container>
            <Typography variant="h4" gutterBottom>
              Contact Stack Overflow
            </Typography>
            <Typography variant="body1">
              Have questions or need assistance? Contact our support team.
            </Typography>
            <Button
              variant="contained"
              style={{
                marginTop: "3rem",
                backgroundColor: "#F48024",
                color: "white",
              }}
            >
              Contact Us
            </Button>
          </Container>
        </div>
      </Base>
    </div>
  );
};

export default StackOverflow;
