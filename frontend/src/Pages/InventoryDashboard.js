import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Chip, CircularProgress, Box, Button, Stack
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../Components/Layout/Layout';
import { useLoader } from '../Context/LoaderContext';
import { useNavigate } from 'react-router-dom';

const InventoryDashboard = () => {
  const [items, setItems] = useState([]);
  const { loading, showLoader, hideLoader } = useLoader();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const fetchItems = async () => {
    showLoader();
    try {
      const response = await axios.get(`${backendUrl}/items`);
      setItems(response.data.items);
    } catch (error) {
      toast.error('Failed to load items');
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>Inventory Dashboard</Typography>

          <Box display="flex" justifyContent="flex-end" mb={3}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => navigate('/add-item')}>
              Add Item
            </Button>
            <Button variant="outlined" onClick={() => navigate('/log-consumption')}>
              Log Consumption
            </Button>
            <Button variant="outlined" onClick={() => navigate('/restock-alerts')}>
              Restock Alerts
            </Button>
          </Stack>
        </Box>


      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Item</strong></TableCell>
                <TableCell><strong>Unit</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Reorder Threshold</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.currentQuantity}</TableCell>
                  <TableCell>{item.reorderThreshold}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={item.status === 'LOW' ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  );
};

export default InventoryDashboard;
