import { Box, Typography } from "@mui/material";
import { Blocks, Settings, Share2, Timer, TrendingUp, UnfoldHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import Card from "./Card";

// features containing icons and i18n keys
const features = {
  title: "features_section.title",
  cards: [
    {
      icon: <UnfoldHorizontal size={48} />,
      heading: "features_section.heading.1",
      paragraph: "features_section.body_text.1",
    },
    {
      icon: <TrendingUp size={48} />,
      heading: "features_section.heading.2",
      paragraph: "features_section.body_text.2",
    },
    {
      icon: <Share2 size={48} />,
      heading: "features_section.heading.3",
      paragraph: "features_section.body_text.3",
    },
  ],
};

// benefits containing icons and i18n keys
const benefits = {
  title: "benefits_section.title",
  cards: [
    {
      icon: <Timer size={48} />,
      heading: "benefits_section.heading.1",
      paragraph: "benefits_section.body_text.1",
    },
    {
      icon: <Settings size={48} />,
      heading: "benefits_section.heading.2",
      paragraph: "benefits_section.body_text.2",
    },
    {
      icon: <Blocks size={48} />,
      heading: "benefits_section.heading.3",
      paragraph: "benefits_section.body_text.3",
    },
  ],
};

/**
 * Shows the features and benefits provided by the project.
 */
const FeaturesAndBenefitsSection = () => {
  // lazy loads translations
  const { t } = useTranslation("components/home");

  return (
    <Box component="section">
      {/* Features Section */}
      <Box
        sx={{
          width: "fit-content",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", lg: "3rem" },
            marginBottom: 3,
          }}
        >
          {t(features.title)}
        </Typography>

        {/* Cards Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2.5,
          }}
        >
          {features.cards.map((card) => (
            <Card key={card.heading} icon={card.icon} heading={t(card.heading)} paragraph={t(card.paragraph)} />
          ))}
        </Box>
      </Box>

      <Box sx={{ my: 16 }} />

      {/* Benefits Section */}
      <Box
        sx={{
          width: "fit-content",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", lg: "3rem" },
            marginBottom: 3,
          }}
        >
          {t(benefits.title)}
        </Typography>

        {/* Cards Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2.5,
          }}
        >
          {benefits.cards.map((card) => (
            <Card key={card.heading} icon={card.icon} heading={t(card.heading)} paragraph={t(card.paragraph)} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesAndBenefitsSection;
