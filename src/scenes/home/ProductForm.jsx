import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [watchType, setWatchType] = useState('');
  const [watchYear, setWatchYear] = useState('');
  const [watchBrand, setWatchBrand] = useState('');
  const [showOtherBrand, setShowOtherBrand] = useState(false);
  const [otherBrand, setOtherBrand] = useState('');
  const [watchCondition, setWatchCondition] = useState('');
  const [watchPhoto, setWatchPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showFillAllDetails, setShowFillAllDetails] = useState(false);
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

    setWatchBrand(selectedBrand);
  };

  const handleOtherBrandChange = (event) => {
    setOtherBrand(event.target.value);
  };
  const handleDonorNameChange = (event) => {
    setDonorName(event.target.value);
  };
  

  const handleProductChange = (event) => {
    setProductName(event.target.value);
  };

  const handleWatchTypeChange = (event) => {
    setWatchType(event.target.value);
  };

  const handleWatchYearChange = (event) => {
    setWatchYear(event.target.value);
  };

  const handleWatchConditionChange = (event) => {
    setWatchCondition(event.target.value);
  };

  const handleWatchPhotoChange = (event) => {
    const file = event.target.files[0];
    setWatchPhoto(file);
  };

  const handleSubmit = async () => {
    if (!productName || !watchType || !watchYear || !watchBrand || !watchCondition || !watchPhoto) {
      setShowFillAllDetails(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('watchType', watchType);
      formData.append('watchYear', watchYear);
      formData.append('watchBrand', watchBrand);
      formData.append('watchCondition', watchCondition);
      formData.append('watchPhoto', watchPhoto); 

      const response = await fetch('https://watchupshop-api.onrender.com/api/products', {
        method: 'POST',
        body: formData,
      });

      setFormSubmitted(true);

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setProductName('');
      setWatchType('');
      setWatchYear('');
      setWatchBrand('');
      setShowOtherBrand(false);
      setOtherBrand('');
      setWatchCondition('');
      setWatchPhoto(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Sell Your Watch</Typography>

      {formSubmitted ? (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          Thank you for your submission!
        </Alert>
      ) : (
        <form>

          <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
            <InputLabel>Select Brand</InputLabel>
            <Select
              value={watchBrand}
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

          <TextField
            label="Year of Manufacturing"
            variant="outlined"
            fullWidth
            value={watchYear}
            onChange={handleWatchYearChange}
            margin="normal"
            style={{ marginTop: '20px' }}
          />

          <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
            <InputLabel>Condition</InputLabel>
            <Select
              value={watchCondition}
              onChange={handleWatchConditionChange}
              label="Condition"
            >
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

          <input
            type="file"
            accept="image/*"
            onChange={handleWatchPhotoChange}
            style={{ marginTop: '20px' }}
          />

          {showFillAllDetails && (
            <Alert severity="error" style={{ marginTop: '20px' }}>
              Please fill in all details before submitting.
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

export default ProductForm;
