import CommunitySection from "@/components/Home/CommunitySection";
import FeaturesAtGlance from "@/components/Home/FeaturesAtGlance";
import FinalCta from "@/components/Home/FinalCta";
import Footer from "@/components/Home/Footer";
import SponsorsSection from "@/components/Home/SponsorsSection";
import TestimonialSection from "@/components/Home/TestimonialSection";
import { Box, Container } from "@mui/material";
import ContributorsSection from "../components/Home/ContributorsSection";
import FeaturesAndBenefitsSection from "../components/Home/FeaturesAndBenefitsSection";
import HeroSection from "../components/Home/HeroSection";

/**
 * Landing page that users first see upon visiting the website.
 */
const Home: React.FC = () => {
  return (
    <Box
      sx={{
        color: "text.primary",
        backgroundColor: "background.paper",
      }}
    >
      <Container maxWidth={false}
        sx={{
          px: 6,
        }}
      >
        <HeroSection />
        <Box sx={{ my: 16 }} />
        <FeaturesAtGlance />
        <Box sx={{ my: 16 }} />
        <FeaturesAndBenefitsSection />
        <Box sx={{ my: 16 }} />
        <ContributorsSection />
        <Box sx={{ my: 16 }} />
        <CommunitySection />
        <Box sx={{ my: 16 }} />
        <TestimonialSection />
        <Box sx={{ my: 16 }} />
        <SponsorsSection />
        <Box sx={{ my: 16 }} />
        <FinalCta />
        <Box sx={{ my: 16 }} />
        <Footer />
      </Container>
    </Box>
  );
};

export default Home;
