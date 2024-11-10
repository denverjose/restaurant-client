/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";

const AddReviewModal = ({ open, onClose, restaurant, onReviewAdded }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Review for {restaurant.name}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ review: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `http://localhost:5000/api/restaurants/${restaurant._id}/review`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...values }),
              }
            );
            if (response.ok) {
              const data = await response.json();
              onReviewAdded(data.review); // Add the new review to the restaurant
              onClose(); // Close the modal
            } else {
              alert("Error adding review");
            }
          }}
        >
          <Form>
            <Field
              name="review"
              as={TextField}
              label="Review"
              fullWidth
              multiline
              rows={4}
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Add Review
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
