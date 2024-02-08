import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const userId = useSelector(state => state.auth.userId); // Assuming you have userId stored in Redux state

  useEffect(() => {
    // Fetch user profile data and recent orders from the backend
    const fetchData = async () => {
      try {
        // Fetch user profile data
        const profileResponse = await fetch(`/api/profile/${userId}`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfileData(profileData);
        } else {
          console.error('Failed to fetch user profile data');
        }

        // Fetch recent orders
        const ordersResponse = await fetch(`/api/orders/${userId}`);
        if (ordersResponse.ok) {
          const recentOrders = await ordersResponse.json();
          setRecentOrders(recentOrders);
        } else {
          console.error('Failed to fetch recent orders');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
      });
      if (response.ok) {
        // Profile updated successfully
        // You can update local state or show a success message
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUpdatedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <Typography variant="h4">Profile Page</Typography>
      <Box mt={2}>
        {/* Profile Details */}
        <Typography variant="h5">Profile Details</Typography>
        <TextField
          name="username"
          label="Username"
          value={updatedProfile.username || profileData.username || ''}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={updatedProfile.email || profileData.email || ''}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        {/* Add more fields for other profile details */}

        {/* Recent Orders */}
        <Typography variant="h5">Recent Orders</Typography>
        <List>
          {recentOrders.map(order => (
            <ListItem key={order.id}>
              <ListItemText primary={`Order ID: ${order.id}`} />
              {/* Add more details as needed */}
            </ListItem>
          ))}
        </List>

        {/* Update Profile Button */}
        <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Box>
    </div>
  );
};

export default ProfilePage;
