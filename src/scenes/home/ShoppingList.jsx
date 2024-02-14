import React, { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme2";

const ShoppingList = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("all");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const smobilePoint = useMediaQuery("(max-width:370px)");
  const breakPoint = useMediaQuery("(min-width:769px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sampleData = [
    {
      id: 1,
      name: "Breitling Navitimer",
      longDesc: "Long description for Famous Watch 1",
      shortDesc: "Short description for Famous Watch 1",
      price: 50000, // Original price in rupees
      discountPrice: 45000, // Discounted price in rupees
      category: "All",
      imageUrl: require("./jamaal.jpg"),
      reviews: [],
    },
    {
      id: 2,
      name: "Patek Philippe Nautilus",
      longDesc: "Long description for Famous Watch 2",
      shortDesc: "Short description for Famous Watch 2",
      price: 50000, // Original price in rupees
      discountPrice: 45000, // Discounted price in rupees
      category: "All",
      imageUrl: require("./jamaal.jpg"),
      reviews: [],
    },
    {
      id: 3,
      name: "Audemars Piguet Royal Oak",
      longDesc: "Long description for Famous Watch 3",
      shortDesc: "Short description for Famous Watch 3",
      price: 50000, // Original price in rupees
      discountPrice: 45000, // Discounted price in rupees
      category: "All",
      imageUrl: require("./jamaal.jpg"),
      reviews: [],
    },
    {
      id: 4,
      name: "Seiko SKX007",
      longDesc: "Long description for Famous Watch 4",
      shortDesc: "Short description for Famous Watch 4",
      price: 50000, // Original price in rupees
      discountPrice: 45000, // Discounted price in rupees
      category: "All",
      imageUrl: require("./jamaal.jpg"),
      reviews: [],
    },
    {
      id: 5,
      name: "Rolex Submariner",
      longDesc: "Long description for Famous Watch 5",
      shortDesc: "Short description for Famous Watch 5",
      price: 50000, // Original price in rupees
      discountPrice: 45000, // Discounted price in rupees
      category: "All",
      imageUrl: require("./jamaal.jpg"),
      reviews: [],
    },
    {
      id: 6,
      name: "Tag Heuer Carrera",
      longDesc: "Long description for Famous Watch 6",
      shortDesc: "Short description for Famous Watch 6",
      price: 50000, // Original price in rupees
      discountPrice: 45000, // Discounted price in rupees
      category: "All",
      imageUrl: require("./jamaal.jpg"),
      reviews: [],
    },
  ];
  

  // Randomly selecting products for one category
  const recommendedItems = sampleData.filter((item) => item.category === "Recommended");
  const randomRecommendedItem = recommendedItems[Math.floor(Math.random() * recommendedItems.length)];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const renderItems = () => {
    let itemsToRender = sampleData;

    if (value !== "all") {
      itemsToRender = sampleData.filter((item) => item.category === value);
    }

    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap="20px"
      >
        {itemsToRender.map((item) => (
          <Box key={item.id} onClick={() => handleOpenDialog(item)}>
            <Item item={item} />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box
      width={breakPoint ? "80%" : "90%"}
      margin="40px auto 80px"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={colors.primary[200]}
        gap="8px"
      >
        <Typography
          variant={smobilePoint ? "h3" : "h2"}
        >
          Featured
        </Typography>
        <Typography
          variant={smobilePoint ? "h3" : "h2"}
          fontWeight="bold"
        >
          Products
        </Typography>
      </Box>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
          "& .MuiButtonBase-root": {
            width: "13%",
            fontSize: breakPoint ? "0.8rem" : "0.52rem",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="Recommended" value="recommended" />
        <Tab label="New Arrivals" value="newArrivals" />
        <Tab label="Best Prices" value="bestPrices" />
        <Tab label="Free Delivery" value="freeDelivery" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      {renderItems()}
      <Dialog open={selectedItem !== null} onClose={handleCloseDialog} maxWidth="lg">
        <DialogTitle>{selectedItem?.name}</DialogTitle>
        <DialogContent sx={{ backgroundColor: "#000", color: "#fff", display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <img src={selectedItem?.imageUrl} alt={selectedItem?.name} style={{ width: "100%", height: "auto" }} />
          </Box>
          <Box sx={{ flex: 1, padding: "20px" }}>
            <Typography>
              <span style={{ textDecoration: "line-through", marginRight: "5px" }}>
                ₹{selectedItem?.price.toLocaleString()}
              </span>
              ₹{selectedItem?.discountPrice.toLocaleString()}
            </Typography>
            <Typography>{selectedItem?.shortDesc}</Typography>
            <Typography>{selectedItem?.longDesc}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button variant="contained" style={{ backgroundColor: "yellow", color: "black" }} onClick={handleCloseDialog}>
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShoppingList;
