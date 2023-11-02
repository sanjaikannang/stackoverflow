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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };
    const res = await fetch(
      `https://stackoverflow-sanjaikannan.onrender.com/user/login`,
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
      localStorage.setItem("token", data.token);

      if (data.result && data.result._id) {
        localStorage.setItem("userId", data.result._id);
        Navigate("/Home");
      } else {
        setErr("User information is missing or invalid !");
      }
    } else {
      setErr("Invalid credentials. Please check your email and password !");
    }
  };

  return (
    <Base>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left side */}
          <Grid item xs={12} md={6}>
            <br /> <br />
            <Typography variant="h4">Welcome to Stack Overflow</Typography>
            <br /> <br />
            <Typography>
              Stack Overflow is a community of developers, where you can ask
              questions and get help from your peers.
            </Typography>
          </Grid>

          {/* Right side*/}
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
              <Typography variant="h4">Login</Typography>
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
                onClick={handleLogin}
                variant="contained"
                sx={{ bgcolor: "#F48024", color: "white" }}
              >
                Login
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

export default Login;
