import { Box, Button, Typography } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { HeadingAndDescription } from "./FeaturesAndBenefitsSection";

const GenericLinkButton = ({ icon, text, title }: { icon: React.ReactNode; text: string; title: string }) => (
  <Button fullWidth sx={buttonStyles}>
    <Box sx={contentBoxStyles}>
      {icon}
      <Box sx={textBoxStyles}>
        <Typography fontWeight="bold">{title}</Typography>
        <Typography color="text.muted">{text}</Typography>
      </Box>
    </Box>
    <ArrowRight  size={22} style={{ color: "text.muted", justifySelf: 'end' }} />
  </Button>
);

export default function CommunitySection() {
  const {t} = useTranslation("components/home");
  return (
    <Box sx={{ display: "grid", gap: 6, mx: "auto" }}>
      <HeadingAndDescription
        heading={t("community_section.title")}
        description={t("community_section.heading.1")}
      />
      <Box sx={linkContainerStyles}>
        <GenericLinkButton
          icon={<FaDiscord size={26} />}
          title={t("community_section.discord.heading")}
          text={t("community_section.discord.body_text")}
        />
        <GenericLinkButton
          icon={<FaGithub size={26} />}
          title={t("community_section.github.heading")}
          text={t("community_section.github.body_text")}
        />
      </Box>
    </Box>
  );
}

// Styles
const buttonStyles = {
  display: "grid",
  alignItems: "center",
  gridTemplateColumns: "90% 10%",
  p: 2,
  px: 3,
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "background.muted",
  textTransform: "none",
  color: "text.primary",
};

const contentBoxStyles = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: { xs: "start", md: "center" },
  gap: 3,
};

const textBoxStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  textAlign: "start",
};

const linkContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  p: 4,
};
