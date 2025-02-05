import { Theme } from "@/interfaces/Theme";
import { Box, CardMedia, Link, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import GalleryTooltip from "../GalleryTooltip/GalleryTooltip";

/**
 * Card component to hold details and actionables for user owned theme.
 *
 * @param theme theme owned by user
 */
const UserOwnedThemeCard: React.FC<{
  theme: Theme;
}> = ({
  theme
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/userprofile");
  const { name, id, themeImg, description } = theme;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        width: "100%",
        height: "fit-content",
        flexDirection: "row",
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        src={themeImg}
        alt={name}
        sx={{
          height: 224,
          width: "80%",
          objectFit: "cover",
          borderRadius: 5,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "relative",
          gap: 3,
        }}
      >
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          {name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
          }}
        >
          {description}
        </Typography>

        {/* Links */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            gap: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Link
            href={`/themes?themeId=${encodeURIComponent(id)}`}
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.875rem",
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {t("user_owned_theme_card.view_theme")}
          </Link>
          <GalleryTooltip content="This feature is currently unavailable." placement="top">
            <Typography
              sx={{
                cursor: "not-allowed",
                fontSize: "0.875rem",
                color: "error.main",
              }}
            >
              {t("user_owned_theme_card.manage_theme")}
            </Typography>
          </GalleryTooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default UserOwnedThemeCard;