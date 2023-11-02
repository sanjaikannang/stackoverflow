import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { Typography, Paper, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router";

const Users = () => {
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) {
      Navigate("/Login", { replace: true });
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://stackoverflow-sanjaikannan.onrender.com/user/getAllUsers",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUsers(userData);
          } else {
            console.error("Failed to fetch users data.");
          }
        } catch (error) {
          console.error("Error fetching users data:", error);
        }
      };

      fetchData();
    }
  }, [Navigate, userId, token]);

  return (
    <Base>
      <Typography variant="h5">Users</Typography>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
              <br />
              <Paper
                elevation={20}
                style={{
                  padding: "1rem",
                  maxHeight: "800px",
                  overflowY: "auto",
                  borderRadius: 0,
                }}
              >
                <Typography variant="h6">Name: {user.name}</Typography>
                <Typography>About: {user.about}</Typography>
                <Typography>
                  Joined On: {new Date(user.joinedOn).toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Base>
  );
};

export default Users;
