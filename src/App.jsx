import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import AddRestaurantModal from "./components/AddRestaurantModal";
import RestaurantList from "./components/RestaurantList";
import AddReviewModal from "./components/AddReviewModal";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(
        `http://localhost:5000/api/restaurants?page=${page}&limit=${limit}&name=${filter}`
      );
      const data = await response.json();
      setRestaurants(data.restaurants);
      setTotalPages(data.pagination.totalPages);
    };
    fetchRestaurants();
  }, [page, limit, filter]);

  const handleAddRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const handleAddReview = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsReviewModalOpen(true);
  };

  const handleReviewAdded = (review) => {
    const updatedRestaurants = restaurants.map((restaurant) => {
      if (restaurant._id === selectedRestaurant._id) {
        return { ...restaurant, reviews: [...restaurant.reviews, review] };
      }
      return restaurant;
    });
    setRestaurants(updatedRestaurants);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1); // Reset to the first page when filter changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle limit change
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1); // Reset to the first page when limit changes
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Restaurant App
      </Typography>

      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsRestaurantModalOpen(true)}
        >
          Add Restaurant
        </Button>
      </Box>
      <Box mb={2}>
        <TextField
          label="Search Restaurants"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>
      <Box mb={2} display="flex" alignItems="center">
        <Typography variant="body1" mr={2}>
          Restaurants per page:
        </Typography>
        <Select value={limit} onChange={handleLimitChange}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Box>
      {restaurants.length > 0 ? (
        <RestaurantList
          restaurants={restaurants}
          limit={limit}
          onAddReview={handleAddReview}
        />
      ) : (
        <div>No restaurants available</div>
      )}
      <AddRestaurantModal
        open={isRestaurantModalOpen}
        onClose={() => setIsRestaurantModalOpen(false)}
        onAddRestaurant={handleAddRestaurant}
      />
      {selectedRestaurant && (
        <AddReviewModal
          open={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          restaurant={selectedRestaurant}
          onReviewAdded={handleReviewAdded}
        />
      )}
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={() => handlePageChange(null, page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          onClick={() => handlePageChange(null, page + 1)}
          disabled={page === totalPages || restaurants.length === 0}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default App;
