import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

import oneTimeSponsor from '../../assets/images/SponsorsPage/one_time_sponsor.jpg';

const OneTimeTab: React.FC = () => {
  return (
    <Box sx={{ justifySelf: 'center', mt: '20px' }}>
      <Card>
        <CardMedia
          component="img"
          src={oneTimeSponsor}
          sx={{
            width: '100%',
            height: 240,
            WebkitMaskImage: 'linear-gradient(#121418,transparent)',
            maskImage: 'linear-gradient(#121418,transparent)',
          }}
        />
        <CardContent>
          <Typography fontWeight="bold">One-time Sponsorship</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OneTimeTab;
