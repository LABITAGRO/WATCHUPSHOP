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


const ExchangeForm = () => {
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

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleWatchTypeChange = (event) => {
    setWatchType(event.target.value);
  };

  const handleWatchYearChange = (event) => {
    setWatchYear(event.target.value);
  };

  const handleWatchBrandChange = (event) => {
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
      const response = await fetch('https://watchupshop-api.onrender.com/api/exchangerequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          watchType,
          watchYear,
          watchBrand,
          watchCondition,
          watchPhoto: watchPhoto ? watchPhoto.name : null, // Assuming you're sending the file name
        }),
      });

      setFormSubmitted(true);

      if (!response.ok) {
        throw new Error('Failed to submit exchange request');
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
      console.error('Error submitting exchange request:', error);
    }
  };

  return (
    // sx={{ backgroundColor: '#000', padding: '20px' }}
    <Box   > 
      <Typography variant="h4" color="white" mb={3}>
        Exchange Your Watch
      </Typography>

      {formSubmitted ? (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          Thank you for your submission!
        </Alert>
      ) : (
        <form>
          <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
            <InputLabel sx={{ color: 'white' }}>Watch Type</InputLabel>
            <Select
              value={watchType}
              onChange={handleWatchTypeChange}
              label="Watch Type"
            >
              <MenuItem value="analog">Analog</MenuItem>
              <MenuItem value="digital">Digital</MenuItem>
              <MenuItem value="smart">Smart Watch</MenuItem>
              <MenuItem value="automatic">Automatic Watch</MenuItem>
              <MenuItem value="mechanical">Mechanical Watch</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Year of Manufacturing"
            variant="outlined"
            fullWidth
            value={watchYear}
            onChange={handleWatchYearChange}
            margin="normal"
            style={{ marginTop: '20px' }}
            sx={{ color: 'white' }}
          />

          <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
            <InputLabel sx={{ color: 'white' }}>Watch Brand</InputLabel>
            <Select
              value={watchBrand}
              onChange={handleWatchBrandChange}
              label="Watch Brand"
            >
              {topWatchBrands.map((brand, index) => (
                <MenuItem key={index} value={brand}>
                  {brand}
                </MenuItem>
              ))}
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Name of Product"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={handleProductNameChange}
            margin="normal"
            style={{ marginTop: '20px' }}
            sx={{ color: 'white' }}
          />

          {showOtherBrand && (
            <TextField
              label="Other Brand Name"
              variant="outlined"
              fullWidth
              value={otherBrand}
              onChange={handleOtherBrandChange}
              margin="normal"
              style={{ marginTop: '10px' }}
              sx={{ color: 'white' }}
            />
          )}

          <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
            <InputLabel sx={{ color: 'white' }}>Watch Condition</InputLabel>
            <Select
              value={watchCondition}
              onChange={handleWatchConditionChange}
              label="Watch Condition"
            >
              <MenuItem value="used">Used</MenuItem>
              <MenuItem value="likeNew">Like New</MenuItem>
              <MenuItem value="fewScratches">Few Scratches</MenuItem>
              <MenuItem value="partiallyBroken">Partially Broken</MenuItem>
              <MenuItem value="needsRepair">Needs Repair</MenuItem>
              <MenuItem value="batteryIssue">Battery Issue</MenuItem>
            </Select>
          </FormControl>

          <input
            type="file"
            accept="image/*"
            onChange={handleWatchPhotoChange}
            style={{ marginTop: '20px', color: 'white' }}
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

          <Typography variant="body2" style={{ marginTop: '10px', color: 'white' }}>
            We will get back to you in 2 working days regarding the best price for your watch and exchange options.
          </Typography>
        </form>
      )}
    </Box>
  );
};

export default ExchangeForm;
