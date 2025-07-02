import { Box, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import React, { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = lazy(() => import('@/components/Home/Footer'));

const Sponsors: React.FC = () => {
  const [currentSponsorCategory, setCurrentSponsoryCategory] = useState(0);
  const { t } = useTranslation('pages/sponsors');

  const handleCategoryChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentSponsoryCategory(value);
  };

  return (
    <Box>
      <Typography variant="h1" fontWeight="bold" align="center">
        {t('sponsors.header')}
      </Typography>
      <Typography variant="h5" fontWeight="normal" align="center" sx={{ color: 'grey' }}>
        {t('sponsors.description')}
      </Typography>
      <Box mt="20px" justifySelf="center">
        <Tabs
          sx={{ backgroundColor: '#27272A54', border: '1px solid #27272A', borderRadius: '12px' }}
          value={currentSponsorCategory}
          onChange={handleCategoryChange}
        >
          <Tab
            label={t('categories.monthly')}
            disableRipple
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: `${currentSponsorCategory === 0 ? '#3B3B3B80' : null}`,
              my: `4px`,
              mx: '4px',
              border: '1px none #27272A',
              borderRadius: '8px',
            }}
          />
          <Tab
            label={t('categories.one_time')}
            disableRipple
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: `${currentSponsorCategory === 1 ? '#3B3B3B80' : null}`,
              my: `4px`,
              mx: '4px',
              border: '1px none #27272A',
              borderRadius: '8px',
            }}
          />
          <Tab
            label={t('categories.existing')}
            disableRipple
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: `${currentSponsorCategory === 2 ? '#3B3B3B80' : null}`,
              my: `4px`,
              mx: '4px',
              border: '1px none #27272A',
              borderRadius: '8px',
            }}
          />
        </Tabs>
      </Box>
      <Suspense fallback={<Skeleton variant="rectangular" height={200} />}>
        <Footer />
      </Suspense>
    </Box>
  );
};

export default Sponsors;
