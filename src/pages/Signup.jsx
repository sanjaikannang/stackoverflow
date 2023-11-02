import React, { useState } from "react";
import Base from "../Base/Base";
import { useNavigate } from "react-router";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const Navigate = useNavigate();

  const handleSignup = async () => {
    const payload = {
      name,
      email,
      password,
    };
    const res = await fetch(
      `https://stackoverflow-sanjaikannan.onrender.com/user/signup`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.token) {
      const userData = {
        name,
        email,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      Navigate("/Login");
    } else {
      setErr(data.error || "Error during signup. Please try again.");
    }
  };

  return (
    <Base>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left side (Stack Overflow content) */}
          <Grid item xs={12} md={6}>
            <br /> <br />
            <Typography variant="h4">Welcome to Stack Overflow</Typography>
            <br /> <br />
            <Typography>
              Stack Overflow is a community of developers, where you can ask
              questions and get help from your peers.
            </Typography>
          </Grid>

          {/* Right side (Signup form) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4">Signup</Typography>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ my: 2 }}
              />
              <Button
                onClick={handleSignup}
                variant="contained"
                sx={{ bgcolor: "#F48024", color: "white" }}
              >
                Signup
              </Button>
              {err && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {err}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default Signup;
