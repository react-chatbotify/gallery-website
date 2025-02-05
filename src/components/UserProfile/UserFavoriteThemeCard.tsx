import { Theme } from "@/interfaces/Theme";
import { Box, CardMedia, Link, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Card component to hold details and actionables for user favorited theme.
 *
 * @param theme theme favorited by user
 * @param removeFavoriteTheme handles user action to remove theme from favorites
 */
const UserFavoriteThemeCard: React.FC<{
  theme: Theme;
  removeFavoriteTheme: (theme: Theme) => void;
}> = ({
  theme,
  removeFavoriteTheme
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
            {t("user_favorite_theme_card.view_theme")}
          </Link>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: "0.875rem",
              color: "error.main",
            }}
            onClick={() => removeFavoriteTheme(theme)}
          >
            {t("user_favorite_theme_card.remove_favorite")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserFavoriteThemeCard;