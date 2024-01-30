import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert'; // Import Alert component

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [watchType, setWatchType] = useState('');
  const [brandName, setBrandName] = useState('');
  const [condition, setCondition] = useState('');
  const [reasonForSelling, setReasonForSelling] = useState('');
  const [image, setImage] = useState(null);

  const [submitSuccess, setSubmitSuccess] = useState(false); // Define submitSuccess state
  const [showError, setShowError] = useState(false); // D

  const handleProductChange = (event) => {
    setProductName(event.target.value);
  };

  const handleWatchTypeChange = (event) => {
    setWatchType(event.target.value);
  };

  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleReasonForSellingChange = (event) => {
    setReasonForSelling(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('watchType', watchType);
      formData.append('brandName', brandName);
      formData.append('condition', condition);
      formData.append('reasonForSelling', reasonForSelling);
      formData.append('image', image);

      // Send data to your Node.js backend
      const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      body: formData,
    });

      const result = await response.json();
      console.log(result);

      // Reset the form after successful submission
      setProductName('');
      setWatchType('');
      setBrandName('');
      setCondition('');
      setReasonForSelling('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <Box>
      <Typography variant="h4">Sell Your Watch</Typography>
      <form>
        <TextField
          label="Name of Watch"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={handleProductChange}
          margin="normal"
          style={{ marginTop: '20px' }}
        />

        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Watch Type</InputLabel>
          <Select
            value={watchType}
            onChange={handleWatchTypeChange}
            label="Watch Type"
          >
            <MenuItem value="analog">Analog</MenuItem>
            <MenuItem value="digital">Digital</MenuItem>
            {/* Add more watch types as needed */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Brand Name</InputLabel>
          <Select
            value={brandName}
            onChange={handleBrandNameChange}
            label="Brand Name"
          >
            <MenuItem value="Rolex">Rolex</MenuItem>
            <MenuItem value="Omega">Omega</MenuItem>
            {/* Add more famous watch brands as needed */}
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Condition</InputLabel>
          <Select
            value={condition}
            onChange={handleConditionChange}
            label="Condition"
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="used">Used</MenuItem>
            <MenuItem value="likeNew">Like New</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Reason for Selling</InputLabel>
          <Select
            value={reasonForSelling}
            onChange={handleReasonForSellingChange}
            label="Reason for Selling"
          >
            <MenuItem value="upgrading">Upgrading</MenuItem>
            <MenuItem value="financial">Financial Reasons</MenuItem>
            {/* Add more reasons as needed */}
          </Select>
        </FormControl>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '20px' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>

      {/* Success message */}
      {submitSuccess && (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          Form submitted successfully!
        </Alert>
      )}

      {/* Error message */}
      {showError && (
        <Alert severity="error" style={{ marginTop: '20px' }}>
          Please fill out all fields.
        </Alert>
      )}
    </Box>
  );
};

export default ProductForm;
