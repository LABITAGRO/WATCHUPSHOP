import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme2";
import "./main-carousel.css";
import { TweenMax, Power3 } from 'gsap';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ProductForm from './ProductForm';
import DonateForm from './DonateForm'
import ExchangeForm from './ExchangeForm';
import ShoppingList from './ShoppingList'; // Import the ShoppingList component
import kkImage from '../../scenes/global/kk.jpg'; 


const MainCarousel = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  let imgItem = useRef(null);

  useEffect(() => {
    TweenMax.to(
      imgItem,
      { opacity: 1, duration: 1, delay: 1.8, y: -30, ease: Power3.easeOut }
    );
  }, []);

  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [openDonateDialog, setOpenDonateDialog] = useState(false);
  const [openExchangeDialog, setOpenExchangeDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(true);

  const handleOpenSellDialog = () => {
    setOpenSellDialog(true);
  };

  const handleCloseSellDialog = () => {
    setOpenSellDialog(false);
  };

  const handleOpenDonateDialog = () => {
    setOpenDonateDialog(true);
  };

  const handleCloseDonateDialog = () => {
    setOpenDonateDialog(false);
  };

  const handleOpenExchangeDialog = () => {
    setOpenExchangeDialog(true);
  };

  const handleCloseExchangeDialog = () => {
    setOpenExchangeDialog(false);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleImageClick = () => {
    handleClosePopup(); // Call handleClosePopup function to close the dialog window
  };
  return (
    <Box>
      <Box className="images"></Box>

      {openPopup && (
      <Dialog open={openPopup} onClose={handleClosePopup} PaperProps={{ style: { backgroundColor: '#000' } }}>
        <DialogContent>
        <Typography variant="h3" style={{ color: 'white', textAlign: 'center' }}>
           -: Welcome :-
          </Typography>
          <br/>
          <hr style={{ backgroundColor: 'gold', height: '1px', border: 'none' }} />
          <br/>
          <Typography variant="h1" style={{ color: 'white', textAlign: 'center' }}>
            WatchUpShop
          </Typography>
          <Typography variant="h3" style={{ color: 'white', textAlign: 'center' }}>
            is in
            <br />
            Testing phase
          </Typography>
          <br/>
          <hr style={{ backgroundColor: 'gold', height: '1px', border: 'none' }} />
          <br/>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
            Developed by:
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height="auto" marginTop={2} style={{ position: 'relative' }}>
            <div
              style={{
                width: '90vw', // 90% of the viewport width
                maxWidth: '350px', // Maximum width of 350px
                height: '50vh', // 50% of the viewport height
                maxHeight: '120px', // Maximum height of 120px
                cursor: 'pointer',
                backgroundImage: `url(${kkImage})`, // Use background-image CSS property
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Box>
          <Box display="flex" justifyContent="center" marginTop={4}>
            <Button variant="contained" color="primary" onClick={handleClosePopup}>Okay</Button>
          </Box>
          
          <Typography variant="body2" style={{ color: 'white', textAlign: 'center', fontSize: '9px', marginTop: '20px' }}>
            For Queries reach us at: interlink.bitta@gmail.com
            <br />
            Get in touch +91 93982 16337
          </Typography>
        </DialogContent>
      </Dialog>
    )}

      <Box
        ref={el => { imgItem = el }}
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        justifyContent="center" // Center horizontally
        color="white"
        alignItems={isNonMobile ? "center" : "initial"} //
        width={isNonMobile ? "50%" : "100%"}
        padding="5px"
        borderRadius="1px"
        textAlign="left"
        position="absolute"
        top={isNonMobile ? "40%" : "220px"} // Top margin adjustment for mobile
        right={isNonMobile ? undefined : "0"}
        left={isNonMobile ? "25%" : "50px"}
        margin={isNonMobile ? undefined : "0 auto"}
        maxWidth={isNonMobile ? undefined : "250px"}
        sx={{
          opacity: "0",
        }}
      >
        {/* Box 1 (Exchange) */}
        <Box
          width={isNonMobile ? "50%" : "100%"}
          padding={isNonMobile ? "100px" : "20px"} // Adjusted padding for mobile
          borderRadius="5px"
          background={isNonMobile ? "blue" : "green"} // New background for mobile
          borderRight={isNonMobile ? "3px solid white" : "0"}
          

          
        >
          <Typography
            variant="h1"
            onClick={handleOpenExchangeDialog}
            style={{
              cursor: 'pointer',
              color: colors.primary[500],
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Exchange
          </Typography>
          <Dialog open={openExchangeDialog} onClose={handleCloseExchangeDialog}>
            {/* <DialogTitle>Exchange Your Watch</DialogTitle> */}
            <DialogContent>
              <ExchangeForm />
            </DialogContent>
          </Dialog>
        </Box>

        {/* Box 2 (Buy) */}
        <Box
      width="100%"
      padding={isNonMobile ? "100px" : "20px"}
      borderRadius="5px"
      background={isNonMobile ? "red" : "yellow"}
      borderRight={isNonMobile ? "3px solid white" : "0"}
    >
      {/* Anchor tag to redirect to ShoppingList.jsx */}
      <a href="#recommendedItemsSection" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h1">Buy</Typography>
      </a>
    </Box>

        {/* Box 3 (Sell) */}
        <Box
          width="100%"
          padding={isNonMobile ? "100px" : "20px"} // Adjusted padding for mobile
          borderRadius="5px"
          background={isNonMobile ? "orange" : "purple"} // New background for mobile
          borderRight={isNonMobile ? "3px solid white" : "0"}
        >
          <Typography
            variant="h1"
            onClick={handleOpenSellDialog}
            style={{
              cursor: 'pointer',
              color: colors.primary[500],
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sell
          </Typography>
          <Dialog open={openSellDialog} onClose={handleCloseSellDialog}>
            <DialogTitle></DialogTitle>
            <DialogContent>
              <ProductForm handleCloseDialog={handleCloseSellDialog} />
            </DialogContent>
          </Dialog>
        </Box>

        {/* Box 4 (Donate) */}
        <Box
          width="100%"
          padding={isNonMobile ? "100px" : "20px"} // Adjusted padding for mobile
          borderRadius="5px"
          background={isNonMobile ? "pink" : "brown"} // New background for mobile
        >
          <Typography
            variant="h1"
            onClick={handleOpenDonateDialog}
            style={{
              cursor: 'pointer',
              color: colors.primary[500],
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Donate
          </Typography>
          <Dialog open={openDonateDialog} onClose={handleCloseDonateDialog}>
            <DialogTitle></DialogTitle>
            <DialogContent>
              <DonateForm handleCloseDialog={handleCloseDonateDialog} />
            </DialogContent>
          </Dialog>
        </Box>

      </Box>
    </Box>
  );
};

export default MainCarousel;
