import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        textAlign: 'center',
        bgcolor: 'background.paper',
        width: '100%',     
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eef2f6', borderRadius: '12px', 
      }}
    >
      <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        All Rights Reserved &copy; INVENTORY LOG
      </Typography>
      {/* Uncomment and update the links as necessary */}
      {/* <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/policy">Privacy Policy</Link>
      </Typography> */}
    </Box>
  );
};

export default Footer;
