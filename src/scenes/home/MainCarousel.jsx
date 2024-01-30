// MainCarousel.jsx
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

  return (
    <Box>
      <Box className="images"></Box>

      <Box
        ref={el => { imgItem = el }}
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        justifyContent="space-between"
        color="white"
        alignItems="center"
        width={isNonMobile ? "50%" : "100%"}
        padding="5px"
        borderRadius="1px"
        textAlign="left"
        position="absolute"
        top={isNonMobile ? "40%" : "20px"} // Top margin adjustment for mobile
        right={isNonMobile ? undefined : "0"}
        margin={isNonMobile ? undefined : "0 auto"}
        maxWidth={isNonMobile ? undefined : "240px"}
        sx={{
          opacity: "0",
        }}
      > {/* Box 4 (Exchange) */}
      <Box
        width="50%"
        padding="100px"
        
        borderRadius="5px"
        
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
          <DialogTitle>Exchange Your Watch</DialogTitle>
          <DialogContent>
            <ExchangeForm />
          </DialogContent>
        </Dialog>
      </Box>
        {/* Box 1 (buy)*/}
        <Box
          marginLeft={isNonMobile ? "5px" : "0"}
          marginBottom={isNonMobile ? "0" : "10px"}
          marginTop={isNonMobile ? "0" : "20px"} // Top margin for mobile
          width="100%"
          padding="100px"
          borderRadius="5px"
          borderRight={isNonMobile ? "3px solid white" : "0"}
        >
          <Typography color={colors.greenAccent[300]}></Typography>
          <Typography variant="h1">Buy</Typography>
        </Box>

        {/* Box 2 (Sell) */}
        <Box
          margin={isNonMobile ? "5px" : "0"}
          marginBottom={isNonMobile ? "0" : "10px"}
          width="100%"
          padding="100px"
          borderRadius="5px"
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
            <DialogTitle>Sell Your Watch</DialogTitle>
            <DialogContent>
              <ProductForm handleCloseDialog={handleCloseSellDialog} />
            </DialogContent>
          </Dialog>
        </Box>

        {/* Box 3 (Donate) */}
        <Box
          marginBottom={isNonMobile ? "0" : "10px"}
          width="100%"
          padding="100px"
          borderRadius="5px"
          // borderRight={isNonMobile ? "3px solid white" : "0"}
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
            <DialogTitle>Donate to NGOs</DialogTitle>
            <DialogContent>
              <DonateForm handleCloseDialog={handleCloseDonateDialog} />
            </DialogContent>
          </Dialog>
        </Box>

        {/* Box 4 (Exchange) */}
        
      </Box>
    </Box>
  );
};

export default MainCarousel;
