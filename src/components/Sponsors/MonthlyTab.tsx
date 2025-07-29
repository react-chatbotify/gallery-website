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
import { useTranslation } from 'react-i18next';

import bronzeSponsor from '../../assets/images/SponsorsPage/bronze_sponsor.jpg';
import goldSponsor from '../../assets/images/SponsorsPage/gold_sponsor.jpg';
import platinumSponsor from '../../assets/images/SponsorsPage/platinum_sponsor.jpg';
import silverSponsor from '../../assets/images/SponsorsPage/silver_sponsor.jpg';

type TierItem = {
  title: string;
  price: string;
  description: string;
  checklist: string[];
};

type MonthlyTabTranslation = {
  [tier: string]: TierItem;
};

const MonthlyTab: React.FC = () => {
  const { t } = useTranslation('components/monthlytab');

  const monthlyTiers = t('tiers', { returnObjects: true }) as MonthlyTabTranslation;

  const getTierImage = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return bronzeSponsor;
      case 'silver':
        return silverSponsor;
      case 'gold':
        return goldSponsor;
      case 'platinum':
        return platinumSponsor;
      default:
        return bronzeSponsor;
    }
  };
  return (
    <Box sx={{ justifySelf: 'center', mt: '20px' }}>
      <Grid2 container spacing={2}>
        {Object.keys(monthlyTiers).map((tier) => (
          <Grid item xl={3} key={tier}>
            <Card>
              <CardMedia
                component="img"
                src={getTierImage(tier)}
                sx={{
                  width: '100%',
                  height: 240,
                  WebkitMaskImage: 'linear-gradient(#121418,transparent)',
                  maskImage: 'linear-gradient(#121418,transparent)',
                }}
              />
              <CardContent>
                <Typography fontWeight="bold" fontSize="30px">
                  {monthlyTiers[tier].title}
                </Typography>
                <Typography fontWeight="bold" fontSize="18px">
                  {monthlyTiers[tier].price}
                </Typography>
                <Typography
                  fontWeight="normal"
                  fontSize="16px"
                  color="text.tertiary"
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
                  {monthlyTiers[tier].description}
                </Typography>
                <List sx={{ mt: '4px' }}>
                  {monthlyTiers[tier].checklist.map((checkListItem, index) => (
                    <ListItem sx={{ p: '0px', my: '4px' }} key={tier + index}>
                      <ListItemIcon sx={{ minWidth: '12.5px', mr: '2px' }}>
                        <Check width={'20px'} height={'20px'} />
                      </ListItemIcon>
                      <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>{checkListItem}</Typography>
                    </ListItem>
                  ))}
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
                  {t('buttonLabel')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid2>
    </Box>
  );
};

export default MonthlyTab;
