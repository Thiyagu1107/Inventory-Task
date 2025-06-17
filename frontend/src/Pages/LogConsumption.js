import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, MenuItem, Typography, Box
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom'; // import useNavigate

const LogConsumption = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ itemId: '', quantity: '', date: '' });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate(); // initialize

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${backendUrl}/items`);
      setItems(res.data.items);
    } catch (error) {
      toast.error('Error loading items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/consumption`, form);
      toast.success('Consumption logged');
      navigate('/dashboard/inventory'); // navigate on success
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error logging consumption');
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box mt={3} mb={2}>
          <Typography variant="h5">Log Consumption</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Select Item"
            name="itemId"
            fullWidth
            value={form.itemId}
            onChange={handleChange}
            margin="normal"
            required
          >
            {items.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField name="quantity" label="Quantity" type="number" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="date" type="date" fullWidth margin="normal" onChange={handleChange} InputLabelProps={{ shrink: true }} required />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
        </form>
      </Container>
    </Layout>
  );
};

export default LogConsumption;
