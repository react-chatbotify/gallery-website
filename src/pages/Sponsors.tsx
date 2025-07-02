import { Box, Skeleton, Tabs, Typography } from '@mui/material';
import React, { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Footer = lazy(() => import('@/components/Home/Footer'));
import SponsorTab from '@/components/Sponsors/SponsorTab';

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
          <SponsorTab currentSponsorCategory={currentSponsorCategory} textValue="categories.monthly" value={0} />
          <SponsorTab currentSponsorCategory={currentSponsorCategory} textValue="categories.one_time" value={1} />
          <SponsorTab currentSponsorCategory={currentSponsorCategory} textValue="categories.existing" value={2} />
        </Tabs>
      </Box>
      <Suspense fallback={<Skeleton variant="rectangular" height={200} />}>
        <Footer />
      </Suspense>
    </Box>
  );
};

export default Sponsors;
