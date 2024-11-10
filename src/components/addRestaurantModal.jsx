/* eslint-disable react/prop-types */
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';

const AddRestaurantModal = ({ open, onClose, onAddRestaurant }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Restaurant</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async (values) => {
            const response = await fetch('http://localhost:5000/api/restaurants', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            if (response.ok) {
              const data = await response.json();
              onAddRestaurant(data.restaurant);  
              onClose(); 
            } else {
              alert('Error adding restaurant');
            }
          }}
        >
          <Form>
            <Field
              name="name"
              as={TextField}
              label="Restaurant Name"
              fullWidth
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">Add</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddRestaurantModal;
