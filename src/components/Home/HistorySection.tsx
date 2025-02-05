import { Box, Typography } from "@mui/material";
import { Hourglass } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Briefly shares about the history of the project.
 */
const HistorySection = () => {
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
      <Hourglass
        style={{
          color: "secondary.main",
          fontSize: "3rem",
          transform: "rotate(12deg)",
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
        {t("history_section.title")}
      </Typography>
      {/* Paragraph */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", lg: "1.125rem" },
          maxWidth: 650,
        }}
      >
        {t("history_section.body_text")}
      </Typography>
    </Box>
  );
};

export default HistorySection;
