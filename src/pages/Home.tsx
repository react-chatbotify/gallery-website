import { Box, Container } from "@mui/material";
import ContributorsSection from "../components/Home/ContributorsSection";
import FeaturesAndBenefitsSection from "../components/Home/FeaturesAndBenefitsSection";
import HeroSection from "../components/Home/HeroSection";
import HistorySection from "../components/Home/HistorySection";
import MissionSection from "../components/Home/MissionSection";

/**
 * Landing page that users first see upon visiting the website.
 */
const Home: React.FC = () => {
  return (
    <Box
      sx={{
        color: "text.primary",
      }}
    >
      <Container
        sx={{
          px: 6,
        }}
      >
        <HeroSection />
        <Box sx={{ my: 16 }} />
        <MissionSection />
        <Box sx={{ my: 16 }} />
        <FeaturesAndBenefitsSection />
        <Box sx={{ my: 16 }} />
        <HistorySection />
        <Box sx={{ my: 16 }} />
        <ContributorsSection />
      </Container>
    </Box>
  );
};

export default Home;
