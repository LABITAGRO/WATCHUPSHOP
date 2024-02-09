import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Typography, DialogTitle, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const Register = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });
  const [showError, setShowError] = useState(false);

  const { name, email, username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://watchupshop.onrender.com/api/auth/register', formData);
      if (response.status === 200) {
        alert('Registration successful');
        setOpen(false); // Close the modal after successful registration
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setShowError(true);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Register
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontSize: '48px', color: '#fff', mb: 2 }}>
          Watchupshop
        </Typography>
        <Typography variant="h4" sx={{ fontSize: '25px', color: '#fff', mb: 2 }}>
          --: Sign Up :--
        </Typography>
        <DialogTitle>"Join us and unlock a world of possibilities with just a click!"</DialogTitle>
        <DialogContent sx={{ bgcolor: 'black', p: 4 }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            variant="outlined"
            name="name"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            variant="outlined"
            name="email"
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={handleChange}
            sx={{ mb: 2 }}
            variant="outlined"
            name="username"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handleChange}
            sx={{ mb: 2 }}
            variant="outlined"
            name="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
      {showError && (
        <Alert severity="error" style={{ marginTop: '20px' }}>
          Registration failed. Please try again.
        </Alert>
      )}
    </div>
  );
};

export default Register;
