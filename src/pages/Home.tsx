import { Box, Container, Skeleton } from '@mui/material';
import React, { lazy, Suspense } from 'react';

// import SponsorsSection from '@/components/Home/SponsorsSection';
// import TestimonialSection from '@/components/Home/TestimonialSection';
import HeroSection from '../components/Home/HeroSection';

const CallToActionSection = lazy(() => import('@/components/Home/CallToActionSection'));
const CommunitySection = lazy(() => import('@/components/Home/CommunitySection'));
const FeaturesAtGlanceSection = lazy(() => import('@/components/Home/FeaturesAtGlanceSection'));
const FeaturesAndBenefitsSection = lazy(() => import('../components/Home/FeaturesAndBenefitsSection'));
const ProjectSection = lazy(() => import('../components/Home/ProjectSection'));
const Footer = lazy(() => import('@/components/Home/Footer'));

/**
 * Landing page that users first see upon visiting the website.
 */
const Home: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          px: { sm: '10%', xs: 0 },
        }}
      >
        <Container maxWidth={false} disableGutters sx={{ px: { sm: 6, xs: 2 } }}>
          <HeroSection />

          {/* spacer */}
          <Box sx={{ height: { sm: '240px', xs: '64px' } }} />

          {/* single Suspense for all lazy sections */}
          <Suspense fallback={<Skeleton variant="rectangular" height={240} animation="wave" sx={{ mb: 4 }} />}>
            <FeaturesAtGlanceSection />
            <Box sx={{ height: { sm: '240px', xs: '64px' } }} />

            <FeaturesAndBenefitsSection />
            <Box sx={{ height: { sm: '240px', xs: '64px' } }} />

            <ProjectSection />
            <Box sx={{ height: { sm: '240px', xs: '64px' } }} />

            <CommunitySection />
            <Box sx={{ height: { sm: '240px', xs: '64px' } }} />

            <CallToActionSection />
            <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
          </Suspense>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          px: { sm: '48px', xs: 0 },
        }}
      >
        <Suspense fallback={<Skeleton variant="rectangular" height={200} />}>
          <Footer />
        </Suspense>
      </Box>
    </>
  );
};

export default Home;
