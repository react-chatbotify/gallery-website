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
import goldSponsor from '../../assets/images/SponsorsPage/gold_sponsor.jpg';
import platinumSponsor from '../../assets/images/SponsorsPage/platinum_sponsor.jpg';
import silverSponsor from '../../assets/images/SponsorsPage/silver_sponsor.jpg';

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
              src={silverSponsor}
              sx={{
                width: '100%',
                height: 240,
                WebkitMaskImage: 'linear-gradient(#121418,transparent)',
                maskImage: 'linear-gradient(#121418,transparent)',
              }}
            />
            <CardContent>
              <Typography fontWeight="bold" fontSize="30px">
                Silver
              </Typography>
              <Typography fontWeight="bold" fontSize="18px">
                Starting at $20 per month
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
                Meant for small-to-medium sized companies.
              </Typography>
              <List sx={{ mt: '4px' }}>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>
                    Secondary level support via Discord
                  </Typography>
                </ListItem>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>A second additional perk</Typography>
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
              src={goldSponsor}
              sx={{
                width: '100%',
                height: 240,
                WebkitMaskImage: 'linear-gradient(#121418,transparent)',
                maskImage: 'linear-gradient(#121418,transparent)',
              }}
            />
            <CardContent>
              <Typography fontWeight="bold" fontSize="30px">
                Gold
              </Typography>
              <Typography fontWeight="bold" fontSize="18px">
                Starting at $50 per month
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
                Meant for medium sized companies.
              </Typography>
              <List sx={{ mt: '4px' }}>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>First level support via Discord</Typography>
                </ListItem>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>A second additional perk</Typography>
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
              src={platinumSponsor}
              sx={{
                width: '100%',
                height: 240,
                WebkitMaskImage: 'linear-gradient(#121418,transparent)',
                maskImage: 'linear-gradient(#121418,transparent)',
              }}
            />
            <CardContent>
              <Typography fontWeight="bold" fontSize="30px">
                Platinum
              </Typography>
              <Typography fontWeight="bold" fontSize="18px">
                Starting at $200 per month
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
                Meant for large companies that want this OSS project to shine.
              </Typography>
              <List sx={{ mt: '4px' }}>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>Priority support via Discord</Typography>
                </ListItem>
                <ListItem sx={{ p: '0px', my: '4px' }}>
                  <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                    <Check width={'20px'} height={'20px'} />
                  </ListItemIcon>
                  <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>A second additional perk</Typography>
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
      </Grid2>
    </Box>
  );
};

export default MonthlyTab;
