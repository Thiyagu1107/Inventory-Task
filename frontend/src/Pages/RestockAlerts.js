import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../Components/Layout/Layout';

const RestockAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios.get(`${backendUrl}/restock-alerts`)
      .then(res => setAlerts(res.data.alerts))
      .catch(() => toast.error('Failed to fetch restock alerts'));
  }, []);

  return (
    <Layout>
      <Container>
        <Typography variant="h5" gutterBottom>Restock Alerts (≤ 3 days)</Typography>

        {alerts.length === 0 ? (
          <Typography>No items need restocking soon.</Typography>
        ) : (
          <Table component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Current Qty</TableCell>
                <TableCell>Days Left</TableCell>
                <TableCell>Recommended Reorder Qty</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map(alert => (
                <TableRow key={alert.itemId}>
                  <TableCell>{alert.itemName}</TableCell>
                  <TableCell>{alert.currentQuantity}</TableCell>
                  <TableCell>{alert.estimatedDaysLeft}</TableCell>
                  <TableCell>{alert.recommendedReorderQty}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Order Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
    </Layout>
  );
};

export default RestockAlerts;
