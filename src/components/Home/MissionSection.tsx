import { Box, Typography } from "@mui/material";
import { Goal } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Briefly shares on the mission of the project.
 */
const MissionSection = () => {
  // lazy loads translations
  const { t } = useTranslation("components/home");

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 4,
      }}
    >
      {/* Icon */}
      <Goal
        style={{
          color: "secondary.main",
          fontSize: "3rem",
        }}
      />
      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontSize: "3rem",
        }}
      >
        {t("mission_section.title")}
      </Typography>
      {/* Paragraph */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", lg: "1.125rem" },
          maxWidth: 650,
          lineHeight: 1.6,
        }}
      >
        <Box component="span" display="block" sx={{ marginBottom: 2 }}>
          {t("mission_section.body_text.1")}
        </Box>
        <Box component="span" display="block">
          {t("mission_section.body_text.2")}
        </Box>
      </Typography>
    </Box>
  );
};

export default MissionSection;
