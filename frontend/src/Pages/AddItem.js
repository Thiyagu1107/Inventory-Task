import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [form, setForm] = useState({ name: '', unit: '', currentQuantity: '', reorderThreshold: '' });
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/items`, form);
      toast.success('Item added');
      navigate('/dashboard/inventory');
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box mt={3} mb={2}>
          <Typography variant="h5">Add Item</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField name="name" label="Item Name" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="unit" label="Unit (e.g., kg, litre)" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="currentQuantity" label="Current Quantity" fullWidth margin="normal" type="number" onChange={handleChange} required />
          <TextField name="reorderThreshold" label="Reorder Threshold" fullWidth margin="normal" type="number" onChange={handleChange} required />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Add Item</Button>
        </form>
      </Container>
    </Layout>
  );
};

export default AddItem;
