import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function MaterialUI() {
  // React state to store input value
  const [name, setName] = useState("");

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      {/* Heading */}
      <Typography variant="h4" gutterBottom>
        Welcome to Material UI Demo
      </Typography>

      {/* Input field */}
      <TextField
        label="Enter your name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert(`Hello, ${name || "Guest"}!`)}
      >
        Say Hello
      </Button>
    </Container>
  );
}

export default MaterialUI;