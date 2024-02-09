import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

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

const DonateForm = () => {
  const [donationType, setDonationType] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhoto, setDonorPhoto] = useState(null);
  const [selectedNGO, setSelectedNGO] = useState('');
  const [percentage, setPercentage] = useState(50); // Default percentage
  const [productName, setProductName] = useState('');
  const [selectedWatchType, setSelectedWatchType] = useState('');
  const [watchYear, setWatchYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showOtherBrand, setShowOtherBrand] = useState(false);
  const [otherBrand, setOtherBrand] = useState('');

  const handleDonationTypeChange = (event) => {
    setDonationType(event.target.value);
  };

  const handleDonationAmountChange = (event) => {
    setDonationAmount(event.target.value);
  };

  const handleDonorNameChange = (event) => {
    setDonorName(event.target.value);
  };

  const handleDonorPhotoChange = (event) => {
    const file = event.target.files[0];
    setDonorPhoto(file);
  };

  const handleSelectedNGOChange = (event) => {
    setSelectedNGO(event.target.value);
  };

  const handlePercentageChange = (event, newValue) => {
    setPercentage(newValue);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleWatchTypeOptionsChange = (event) => {
    setSelectedWatchType(event.target.value);
  };

  const handleWatchYearChange = (event) => {
    setWatchYear(event.target.value);
  };

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

  const handleSubmit = async () => {
    // Implement your submission logic here
    try {
      const formData = new FormData();
      formData.append('donationType', donationType);
      formData.append('donationAmount', donationAmount);
      formData.append('donorName', donorName);
      formData.append('donorPhoto', donorPhoto);
      formData.append('selectedNGO', selectedNGO);
      formData.append('percentage', percentage);
      formData.append('productName', productName);
      formData.append('selectedWatchType', selectedWatchType);
      formData.append('watchYear', watchYear);
      formData.append('selectedBrand', selectedBrand);

      // const response = await fetch('http://localhost:5000/api/donations', {
      //   method: 'POST',
      //   body: formData,
      // });

      const response = await fetch('https://watchupshop.onrender.com/api/donations', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      // Reset the form after submission
      setDonationType('');
      setDonationAmount('');
      setDonorName('');
      setDonorPhoto(null);
      setSelectedNGO('');
      setPercentage(50); // Reset percentage to default
      setProductName('');
      setSelectedWatchType('');
      setWatchYear('');
      setSelectedBrand('');
      setShowOtherBrand(false);
      setOtherBrand('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">-: Donate :-</Typography>
      <form>
        <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
          <InputLabel>Donation Type</InputLabel>
          <Select
            value={donationType}
            onChange={handleDonationTypeChange}
            label="Donation Type"
          >
            <MenuItem value="partial">Partial Donation</MenuItem>
            <MenuItem value="full">Full Amount Donation</MenuItem>
          </Select>
        </FormControl>

        {donationType === 'partial' && (
          <>
            <Typography id="percentage-slider" gutterBottom style={{ marginTop: '20px' }}>
              Percentage of Sold Price: {percentage}%
            </Typography>
            <Slider
              value={percentage}
              onChange={handlePercentageChange}
              aria-labelledby="percentage-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={100}
              style={{ marginTop: '10px' }}
            />
          </>
        )}

        {/* <TextField
          label="Donation Amount"
          variant="outlined"
          fullWidth
          value={donationAmount}
          onChange={handleDonationAmountChange}
          margin="normal"
          style={{ marginTop: '20px' }}
        /> */}

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
          <InputLabel>Select NGO</InputLabel>
          <Select
            value={selectedNGO}
            onChange={handleSelectedNGOChange}
            label="Select NGO"
          >
            <MenuItem value="ngo1">NGO 1</MenuItem>
            <MenuItem value="ngo2">NGO 2</MenuItem>
            <MenuItem value="ngo3">NGO 3</MenuItem>
          </Select>
        </FormControl>

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
            value={selectedWatchType}
            onChange={handleWatchTypeOptionsChange}
            label="Watch Type"
          >
            <MenuItem value="analog">Analog</MenuItem>
            <MenuItem value="digital">Digital</MenuItem>
            <MenuItem value="smart">Smart Watch</MenuItem>
            <MenuItem value="smart">Automatic Watch</MenuItem>
            <MenuItem value="smart">Mechanical Watch</MenuItem>
            {/* Add more watch type options as needed */}
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

        <input
          type="file"
          accept="image/*"
          onChange={handleDonorPhotoChange}
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
    </Box>
  );
};

export default DonateForm;
