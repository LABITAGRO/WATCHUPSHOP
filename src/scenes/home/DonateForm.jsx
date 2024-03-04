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

const causes = [
  { id: 1, name: 'Health Care', organizations: ['Indian Cancer Society', 'Childline India Foundation', 'The global fund to fight AIDS, tuberculosis and malaria (GFATM)', 'Heart Foundation of India', 'Other'] },
  { id: 2, name: 'Education', organizations: ['CRY (Child Right and You)', 'Save the children India', 'Pratham Education Foundation', 'Akshaya Patra Foundation', 'Teach For India', 'Other'] },
  { id: 3, name: 'Social Service', organizations: ['Oxfam India', 'Centre for Science and environment', 'WWF - India', 'Solar Energy Society of India', 'Indian Climate Action Network', 'Other'] },
  { id: 4, name: 'Environment', organizations: ['Greenpeace India', 'Wildlife Trust of India (WTI)', 'World Wide Fund for Nature (WWF)', 'Chintan Environmental Research and Action', 'Ashoka Trust for Research in Ecology and Environment (ATREE)', 'Other'] },
  { id: 5, name: 'Animal Welfare', organizations: ['People for Animal (PFA)', 'Bluecross of India', 'Friendicoes', 'Animal Welfare board of India (AWBI)', 'Compassion Unlimited Plus Action (CUPA)', 'Other'] },
  { id: 6, name: 'Disaster Relief', organizations: ['Care India', 'Action Aid India', 'Rapid response', 'Oxam India', 'Other'] },
  { id: 7, name: 'Elderly Care', organizations: ['HelpAge India', 'Agewell Foundation', 'Dada Dadi Helf Foundation', 'Elderly Care India', 'The Senior Care Foundation', 'Other'] },
  { id: 8, name: 'Disability', organizations: ['Action for', 'Autism', 'Indian Spinal Injuries', 'Narayan Seva Sansthan', 'Diya Foundation', 'Centre', 'National Centre for Promotion of Employment for disabled People (NCPEDP)', 'Other'] },
  { id: 9, name: 'Women Empowerment', organizations: ['Self Employed Women\'s Association (SEWA)', 'Guria India', 'Action Aid', 'Snehalya', 'My Choices Foundation', 'Other'] },
];

const DonateForm = () => {
  const [donationType, setDonationType] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhoto, setDonorPhoto] = useState(null);
  const [selectedCause, setSelectedCause] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [percentage, setPercentage] = useState(50); // Default percentage
  const [productName, setProductName] = useState('');
  const [selectedWatchType, setSelectedWatchType] = useState('');
  const [watchYear, setWatchYear] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showOtherBrand, setShowOtherBrand] = useState(false);
  const [otherBrand, setOtherBrand] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showFillAllDetails, setShowFillAllDetails] = useState(false); // New state

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

  const handleSelectedCauseChange = (event) => {
    const causeId = event.target.value;
    setSelectedCause(causeId);
    setSelectedOrganization(''); // Reset selected organization when cause changes
  };

  const handleSelectedOrganizationChange = (event) => {
    setSelectedOrganization(event.target.value);
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
    if (!donationType || !donorName || !selectedCause || !selectedOrganization || !selectedWatchType || !watchYear || !selectedBrand || (selectedBrand === 'Other' && !otherBrand) || !donorPhoto) {
      setShowFillAllDetails(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('donationType', donationType);
      formData.append('donationAmount', donationAmount);
      formData.append('donorName', donorName);
      formData.append('donorPhoto', donorPhoto);
      formData.append('selectedCause', selectedCause);
      formData.append('selectedOrganization', selectedOrganization);
      formData.append('percentage', percentage);
      formData.append('productName', productName);
      formData.append('selectedWatchType', selectedWatchType);
      formData.append('watchYear', watchYear);
      formData.append('selectedBrand', selectedBrand);
  
      const response = await fetch('https://watchupshop-api.onrender.com/api/donations', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
  
      // Set formSubmitted to true after successful submission
      setFormSubmitted(true);
  
      // Reset the form after submission
      setDonationType('');
      setDonationAmount('');
      setDonorName('');
      setDonorPhoto(null);
      setSelectedCause('');
      setSelectedOrganization('');
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

      {/* Conditional rendering based on formSubmitted state */}
      {formSubmitted ? (
        <Alert severity="success" style={{ marginTop: '20px' }}>
          Thank you for your submission!
        </Alert>
      ) : (
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
            label="Donor Name"
            variant="outlined"
            fullWidth
            value={donorName}
            onChange={handleDonorNameChange}
            margin="normal"
            style={{ marginTop: '20px' }}
          />

          

          <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
            <InputLabel>Select a Cause</InputLabel>
            <Select
              value={selectedCause}
              onChange={handleSelectedCauseChange}
              label="Select a Cause"
            >
              {causes.map((cause) => (
                <MenuItem key={cause.id} value={cause.id}>
                  {cause.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCause && (
            <FormControl variant="outlined" fullWidth style={{ marginTop: '20px' }}>
              <InputLabel>Select Organization</InputLabel>
              <Select
                value={selectedOrganization}
                onChange={handleSelectedOrganizationChange}
                label="Select Organization"
              >
                {causes.find((cause) => cause.id === selectedCause)?.organizations.map((organization, index) => (
                  <MenuItem key={index} value={organization}>
                    {organization}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

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


          

          <TextField
            label="Name of Watch"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={handleProductNameChange}
            margin="normal"
            style={{ marginTop: '20px' }}
          />

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
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleDonorPhotoChange}
            style={{ marginTop: '20px' }}
          />

          {/* New code added here */}
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

export default DonateForm;
