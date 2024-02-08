import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import RegisterModal from './RegisterModal'; // Import your RegisterModal component here

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in with:', { username, password });
    // Close the modal after login attempt
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#000', // Black background color
          boxShadow: 24,
          p: 4,
          width: 400,
          textAlign: 'center', // Center align the content
        }}
      >
        <Typography variant="h4" sx={{ fontSize: '48px', color: '#fff', mb: 2 }}>
          Watchupshop
        </Typography>
        <TextField id="username" label="Username" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <TextField id="password" label="Password" type="password" fullWidth variant="outlined" sx={{ mb: 2 }} />
        <FormControlLabel
          control={<Checkbox defaultChecked color="primary" />}
          label="Remember me"
          sx={{ color: '#fff' }} // White text color
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        {/* <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button> */}
        <RegisterModal /> {/* Render your RegisterModal component */}
      </Box>
    </Modal>
  );
};

export default LoginModal;
