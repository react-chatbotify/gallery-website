import { Box, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import React, { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ExistingTab from '@/components/Sponsors/ExistingTab';
import FAQ from '@/components/Sponsors/FAQ';
import MonthlyTab from '@/components/Sponsors/MonthlyTab';
import OneTimeTab from '@/components/Sponsors/OneTimeTab';
import Steps from '@/components/Sponsors/Steps';

const Footer = lazy(() => import('@/components/Home/Footer'));

const Sponsors: React.FC = () => {
  const [currentSponsorCategory, setCurrentSponsoryCategory] = useState(0);
  const { t } = useTranslation('pages/sponsors');

  const handleCategoryChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentSponsoryCategory(value);
  };

  return (
    <Box>
      <Typography
        fontWeight="bold"
        fontSize="60px"
        sx={{
          letterSpacing: '-1.2%',
          lineHeight: 1.2,
          maxWidth: {
            md: 700,
          },
          textAlign: 'center',
          justifySelf: 'center',
        }}
        lineHeight={1.2}
      >
        {t('sponsors.header')}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="normal"
        lineHeight={1.4}
        sx={{
          color: 'text.tertiary',
          textAlign: 'center',
          lineHeight: 1.4,
          maxWidth: {
            md: 720,
          },
          justifySelf: 'center',
          mt: '16px',
        }}
      >
        {t('sponsors.description')}
      </Typography>
      <Box mt="20px" justifySelf="center">
        <Tabs
          sx={{
            backgroundColor: 'background.muted',
            border: '1px solid #27272A',
            borderRadius: '12px',
            textTransform: 'none',
            '& .MuiTabs-indicator': { display: 'none' },
          }}
          value={currentSponsorCategory}
          onChange={handleCategoryChange}
        >
          <Tab
            label={t('segments.monthly')}
            disableRipple
            sx={{
              color: `${currentSponsorCategory === 0 ? 'white !important' : 'text.tertiary'}`,
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
            label={t('segments.one_time')}
            disableRipple
            sx={{
              color: `${currentSponsorCategory === 1 ? 'white !important' : 'text.tertiary'}`,
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
            label={t('segments.existing')}
            disableRipple
            sx={{
              color: `${currentSponsorCategory === 2 ? 'white !important' : 'text.tertiary'}`,
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
      {currentSponsorCategory === 0 ? <MonthlyTab /> : null}
      {currentSponsorCategory === 1 ? <OneTimeTab /> : null}
      {currentSponsorCategory === 2 ? <ExistingTab /> : null}
      <Steps />
      <FAQ />
      <Suspense fallback={<Skeleton variant="rectangular" height={200} />}>
        <Footer />
      </Suspense>
    </Box>
  );
};

export default Sponsors;
