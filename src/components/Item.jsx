import React from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme2";

const Item = ({ item, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const smobilePoint = useMediaQuery("(max-width:370px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ item }));
  };

  return (
    <Box width={width} mb="2px">
      <Box
        position="relative"
        backgroundColor={colors.primary[300]}
        width={smobilePoint ? "280px" : "300px"}
        height="350px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          transition: "transform 0.2s ease-in-out", // Apply transition CSS using sx prop
          "&:hover": { transform: "scale(1.05)" }, // Scale effect on hover
        }}
      >
        {/* Item image */}
        <img
          alt={item.name}
          width="200px"
          height="290px"
          src={item.imageUrl}
          onDoubleClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer", objectFit: "contain" }}
        />
        {/* Add to cart */}
        <Box
          display="flex"
          justifyContent="center"
          position="absolute"
          bottom="3%"
          left="0"
          width="100%"
          padding="1%"
        >
          <Button
            size="small"
            onClick={handleAddToCart}
            sx={{
              backgroundColor: colors.yellowAccent[700],
              color: "#fbfbfe",
              fontWeight: "bold",
              "&:hover": { backgroundColor: colors.yellowAccent[800] },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
      {/* Item details */}
      <Box mt="3px">
        <Typography variant="subtitle2" color={colors.primary[100]}>
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </Typography>
        <Typography color={colors.primary[100]} fontWeight="bold">
          #{item.price}
        </Typography>
        <Typography
          onClick={() => navigate(`/item/${item.id}`)}
          variant="h5"
          color={colors.primary[100]}
          pb="3px"
          sx={{ "&:hover": { color: "#c36303", cursor: "pointer" }, transition: ".3s" }}
        >
          {item.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
