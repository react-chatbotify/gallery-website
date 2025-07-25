import { Box, Typography } from '@mui/material';
import React from 'react';

const Steps: React.FC = () => {
  return (
    <Box mt={8}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '60px',
          letterSpacing: '-0.75%',
          lineHeight: 1.2,
          color: '#F8FAFC',
          textAlign: 'center',
          justifySelf: 'center',
        }}
      >
        Steps to becoming a sponsor
      </Typography>
      <Typography
        mt={2}
        sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: 1.75,
          color: '#A7AFB8',
          textAlign: 'center',
          justifySelf: 'center',
          maxWidth: {
            md: 600,
          },
        }}
      >
        We prefer to talk directly with each of our potential sponsor as we hope that our core values align and that we
        are truly a fitting match.
      </Typography>
    </Box>
  );
};

export default Steps;
