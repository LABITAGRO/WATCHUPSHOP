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
  const [showError, setShowError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false); // State for "Thank you" pop-up
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showOtherBrand, setShowOtherBrand] = useState(false);
  const [otherBrand, setOtherBrand] = useState('');
  const [donorName, setDonorName] = useState('');
  const topWatchBrands = [
    'Rolex',
    'Omega',
    'Tag Heuer',
    'Seiko',
    'Citizen',
    'Patek Philippe',
    'Audemars Piguet',
    'Cartier',
    'Breitling',
    'Hublot',
    'IWC Schaffhausen',
    'Panerai',
    'Jaeger-LeCoultre',
    'Tissot',
    'Longines',
    'Vacheron Constantin',
    'Bell & Ross',
    'Ulysse Nardin',
    'Chopard',
    'Zenith',
  ];

  const handleBrandOptionsChange = (event) => {
    const selectedBrand = event.target.value;

    if (selectedBrand === 'Other') {
      setShowOtherBrand(true);
    } else {
      setShowOtherBrand(false);
    }

    setSelectedBrand(selectedBrand);
  };

  const handleOtherBrandChange = (event) => {
    setOtherBrand(event.target.value);
  };
  

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

  const handleDonorNameChange = (event) => {
    setDonorName(event.target.value);
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

      const response = await fetch('http://localhost:3500/api/products', {
        method: 'POST',
        body: formData,
      });

       // Set formSubmitted to true after successful submission
       setFormSubmitted(true);

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setShowError(false); // Reset error state
      setShowThankYou(true); // Show "Thank you" pop-up
      setProductName('');
      setWatchType('');
      setBrandName('');
      setCondition('');
      setReasonForSelling('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowError(true);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Sell Your Watch</Typography>
{/* Conditional rendering based on formSubmitted state */}
{formSubmitted ? (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          Thank you for your submission!
        </Alert>
      ) : (

      <form>

        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Select Brand</InputLabel>
          <Select
            value={selectedBrand}
            onChange={handleBrandOptionsChange}
            label="Select Brand"
          >
            {topWatchBrands.map((brand, index) => (
              <MenuItem key={index} value={brand}>
                {brand}
              </MenuItem>
            ))}
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>


         {showOtherBrand && (
          <TextField
            label="Other Brand Name"
            variant="outlined"
            fullWidth
            value={otherBrand}
            onChange={handleOtherBrandChange}
            margin="normal"
            style={{ marginTop: '10px' }}
          />
        )}

<FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Watch Type</InputLabel>
          <Select
            value={watchType}
            onChange={handleWatchTypeChange}
            label="Watch Type"
          >
            <MenuItem value="digital">Digital</MenuItem>
            <MenuItem value="analog">Analog</MenuItem>
            <MenuItem value="chronograph">Chronograph</MenuItem>
             <MenuItem value="diver">Diver</MenuItem>
            <MenuItem value="smart">Smart</MenuItem>
            <MenuItem value="luxury">Luxury</MenuItem>

              <MenuItem value="smart">Smart Watch</MenuItem>
              <MenuItem value="smart">Automatic Watch</MenuItem>
              <MenuItem value="smart">Mechanical Watch</MenuItem>
            {/* Add more watch types as needed */}
          </Select>
        </FormControl>


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
          <InputLabel>Condition</InputLabel>
          <Select
            value={condition}
            onChange={handleConditionChange}
            label="Condition"
          >
             <MenuItem value="new">New</MenuItem>
    <MenuItem value="used">Used</MenuItem>
    <MenuItem value="refurbished">Refurbished</MenuItem>
    <MenuItem value="open-box">Open Box</MenuItem>
    <MenuItem value="damaged">Damaged</MenuItem>
    <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
  label="Is there any Special Occasion? (e.g., Anniversary)"
  variant="outlined"
  fullWidth
  value={donorName}
  onChange={handleDonorNameChange}
  margin="normal"
  style={{ marginTop: '20px' }}
  InputLabelProps={{ shrink: true }}
/>

        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Reason for Selling</InputLabel>
          <Select
            value={reasonForSelling}
            onChange={handleReasonForSellingChange}
            label="Reason for Selling"
          >
            <MenuItem value="upgrading">Upgrading</MenuItem>
    <MenuItem value="moving">Moving</MenuItem>
    <MenuItem value="financial">Financial Reasons</MenuItem>
    <MenuItem value="not-needed">No Longer Needed</MenuItem>
    <MenuItem value="gift">Received as a Gift</MenuItem>
    <MenuItem value="upgrading">Other</MenuItem>
          </Select>
        </FormControl>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '20px' }}
        />

        {/* Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>

      

      // {/* "Thank you" pop-up */}
      // {showThankYou && (
      //   <Alert severity="success" style={{ marginTop: '20px' }}>
      //     Thank you for your submission!
      //   </Alert>
       )}

    </Box>
  );
};

export default ProductForm;
