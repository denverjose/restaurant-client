/* eslint-disable react/prop-types */

import { Button, Typography, Box } from "@mui/material";

const RestaurantList = ({ restaurants, onAddReview, limit }) => {
  const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
    marginTop: "20px",
  };

  const cardStyle = {
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const cardTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
  };

  const noRestaurantMessageStyle = {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
    marginTop: "20px",
  };

  return (
    <div style={gridContainerStyle}>
      {restaurants && restaurants.length > 0 ? (
        restaurants.slice(0, limit).map((restaurant) => (
          <Box key={restaurant._id} sx={cardStyle}>
            <Typography variant="h6" sx={cardTitleStyle}>
              {restaurant.name}
            </Typography>
            {restaurant.reviews && restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review) => (
                <Typography key={review._id} variant="body2">
                  {review.review}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No reviews yet
              </Typography>
            )}
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: "auto" }}
              onClick={() => onAddReview(restaurant)}
            >
              Add Review
            </Button>
          </Box>
        ))
      ) : (
        <Typography sx={noRestaurantMessageStyle}>
          No restaurants available
        </Typography>
      )}
    </div>
  );
};

export default RestaurantList;
