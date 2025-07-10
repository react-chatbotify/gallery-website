import { Box, Card, CardContent, CardMedia, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { Check } from 'lucide-react';
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
          <Typography fontWeight={600} fontSize="30px" lineHeight={1.2}>
            One-time Sponsorship
          </Typography>
          <Typography sx={{ mt: '16px', fontSize: '16px', lineHeight: 1.75, color: '#A7AFB8' }}>
            Want to support us with a singular support payment?
          </Typography>
          <List sx={{ mt: '4px' }}>
            <ListItem sx={{ p: '0px', my: '4px' }}>
              <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                <Check width={'20px'} height={'20px'} />
              </ListItemIcon>
              <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>No monthly/yearly payments</Typography>
            </ListItem>
            <ListItem sx={{ p: '0px', my: '4px' }}>
              <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                <Check width={'20px'} height={'20px'} />
              </ListItemIcon>
              <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>Discord badge</Typography>
            </ListItem>
            <ListItem sx={{ p: '0px', my: '4px' }}>
              <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                <Check width={'20px'} height={'20px'} />
              </ListItemIcon>
              <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>Discord badge</Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OneTimeTab;
