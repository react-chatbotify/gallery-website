import { Box, Container } from '@mui/material';

import CallToActionSection from '@/components/Home/CallToActionSection';
import CommunitySection from '@/components/Home/CommunitySection';
import FeaturesAtGlanceSection from '@/components/Home/FeaturesAtGlanceSection';
import Footer from '@/components/Home/Footer';

// import SponsorsSection from '@/components/Home/SponsorsSection';
// import TestimonialSection from '@/components/Home/TestimonialSection';
import FeaturesAndBenefitsSection from '../components/Home/FeaturesAndBenefitsSection';
import HeroSection from '../components/Home/HeroSection';
import ProjectSection from '../components/Home/ProjectSection';

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
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            px: { sm: 6, xs: 2 },
          }}
        >
          <HeroSection />
          <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
          <FeaturesAtGlanceSection />
          <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
          <FeaturesAndBenefitsSection />
          <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
          <ProjectSection />
          <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
          <CommunitySection />
          <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
          {/* <TestimonialSection />
        <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
        <SponsorsSection />
        <Box sx={{ height: { sm: '240px', xs: '64px' } }} /> */}
          <CallToActionSection />
          <Box sx={{ height: { sm: '240px', xs: '64px' } }} />
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          px: { sm: '48px', xs: 0 },
        }}
      >
        <Footer />
      </Box>
    </>
  );
};

export default Home;
