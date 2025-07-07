import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { Check } from 'lucide-react';
import React from 'react';

import bronzeSponsor from '../../assets/images/SponsorsPage/bronze_sponsor.jpg';

const MonthlyTab: React.FC = () => {
  return (
    <Box sx={{ justifySelf: 'center', mt: '20px' }}>
      <Grid2 container spacing={2}>
        <Grid item xl={3}>
          <Card>
            <CardMedia
              component="img"
              src={bronzeSponsor}
              sx={{
                width: '100%',
                height: 240,
                WebkitMaskImage: 'linear-gradient(#121418,transparent)',
                maskImage: 'linear-gradient(#121418,transparent)',
              }}
            />
            <CardContent>
              <Typography fontWeight="bold" fontSize="30px">
                Bronze
              </Typography>
              <Typography fontWeight="bold" fontSize="18px">
                Starting at $5 per month
              </Typography>
              <Typography
                fontWeight="normal"
                fontSize="16px"
                color="#A7AFB8"
                lineHeight={1.75}
                alignSelf="center"
                sx={{
                  textAlign: 'left',
                  lineHeight: 1.75,
                  maxWidth: {
                    md: 280,
                  },
                  mt: '16px',
                }}
              >
                For individuals or small companies that wish contribute to our project.
              </Typography>
              <List sx={{ mt: '4px' }}>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>Addition to our sponsors’ list</Typography>
                </ListItem>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>Discord badge</Typography>
                </ListItem>
              </List>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', py: '12px' }}>
              <Button
                size="small"
                disableRipple
                sx={{
                  textTransform: 'none',
                  color: '#A1A1AA',
                  fontSize: '18px',
                  px: '24px',
                  backgroundColor: '#242628',
                  borderRadius: '12px',
                  fontWeight: 500,
                }}
              >
                Talk to us to get started
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xl={3}>
          <Card>
            <CardMedia
              component="img"
              src={bronzeSponsor}
              sx={{
                width: '100%',
                height: 240,
              }}
            />
            <CardContent>
              <Typography fontWeight="bold">Bronze</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3}>
          <Card>
            <CardMedia
              component="img"
              src={bronzeSponsor}
              sx={{
                width: '100%',
                height: 240,
              }}
            />
            <CardContent>
              <Typography fontWeight="bold">Bronze</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3}>
          <Card>
            <CardMedia
              component="img"
              src={bronzeSponsor}
              sx={{
                width: '100%',
                height: 240,
              }}
            />
            <CardContent>
              <Typography fontWeight="bold">Bronze</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid2>
    </Box>
  );
};

export default MonthlyTab;
