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

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setShowError(false); // Reset error state
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
            <MenuItem value="smart">Smart Watch</MenuItem>
            <MenuItem value="smart">Automatic Watch</MenuItem>
            <MenuItem value="smart">Mechanical Watch</MenuItem>
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
            <MenuItem value="TAG Heuer">TAG Heuer</MenuItem>
<MenuItem value="Patek Philippe">Patek Philippe</MenuItem>
<MenuItem value="Audemars Piguet">Audemars Piguet</MenuItem>
<MenuItem value="Breitling">Breitling</MenuItem>
<MenuItem value="Cartier">Cartier</MenuItem>
<MenuItem value="Hublot">Hublot</MenuItem>
<MenuItem value="Jaeger-LeCoultre">Jaeger-LeCoultre</MenuItem>
<MenuItem value="Panerai">Panerai</MenuItem>
<MenuItem value="IWC Schaffhausen">IWC Schaffhausen</MenuItem>
<MenuItem value="Breguet">Breguet</MenuItem>
<MenuItem value="Vacheron Constantin">Vacheron Constantin</MenuItem>
<MenuItem value="Longines">Longines</MenuItem>
<MenuItem value="Tissot">Tissot</MenuItem>
<MenuItem value="Seiko">Seiko</MenuItem>
<MenuItem value="Citizen">Citizen</MenuItem>

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
<MenuItem value="certifiedPreOwned">Certified Pre-Owned</MenuItem>
<MenuItem value="vintage">Vintage</MenuItem>
<MenuItem value="limitedEdition">Limited Edition</MenuItem>
<MenuItem value="prototype">Prototype</MenuItem>
<MenuItem value="custom">Custom</MenuItem>
<MenuItem value="bespoke">Bespoke</MenuItem>
<MenuItem value="collector'sEdition">Collector's Edition</MenuItem>
<MenuItem value="antique">Antique</MenuItem>
<MenuItem value="rare">Rare</MenuItem>
<MenuItem value="specialEdition">Special Edition</MenuItem>
<MenuItem value="handcrafted">Handcrafted</MenuItem>
<MenuItem value="artisan">Artisan</MenuItem>

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
<MenuItem value="changingStyle">Changing Style</MenuItem>
<MenuItem value="rarelyWorn">Rarely Worn</MenuItem>
<MenuItem value="gift">Received as a Gift</MenuItem>
<MenuItem value="makingSpace">Making Space</MenuItem>
<MenuItem value="collectionFocusShift">Shift in Collection Focus</MenuItem>
<MenuItem value="repairCosts">High Repair Costs</MenuItem>
<MenuItem value="upgradeToLuxury">Upgrading to Luxury</MenuItem>
<MenuItem value="wantDifferentFeatures">Wanting Different Features</MenuItem>
<MenuItem value="noLongerNeeded">No Longer Needed</MenuItem>
<MenuItem value="resizing">Resizing</MenuItem>
<MenuItem value="moving">Moving</MenuItem>
<MenuItem value="retirement">Retirement</MenuItem>

            {/* Add more reasons as needed */}
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

      {/* Error message */}
      {showError && (
        <Alert severity="error" style={{ marginTop: '20px' }}>
          Failed to submit the form. Please try again later.
        </Alert>
      )}
    </Box>
  );
};

export default ProductForm;
