import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { Check } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import oneTimeSponsor from '../../assets/images/SponsorsPage/one_time_sponsor.jpg';

const OneTimeTab: React.FC = () => {
  const { t } = useTranslation('components/onetimetab');
  const checklist = t('one_time.checklist', { returnObjects: true }) as Array<string>;
  return (
    <Box sx={{ justifySelf: 'center', mt: '20px', maxWidth: { md: 315 } }}>
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
            {t('one_time.title')}
          </Typography>
          <Typography sx={{ mt: '16px', fontSize: '16px', lineHeight: 1.75, color: '#A7AFB8' }}>
            {t('one_time.description')}
          </Typography>
          <List sx={{ mt: '4px' }}>
            {checklist.map((checkListItem, index) => (
              <ListItem sx={{ p: '0px', my: '4px' }} key={index}>
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
    </Box>
  );
};

export default OneTimeTab;
