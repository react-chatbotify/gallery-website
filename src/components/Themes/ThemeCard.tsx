import useIsDesktop from "@/hooks/useIsDesktop";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography
} from "@mui/material";
import { Heart } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Theme } from "../../interfaces/Theme";

/**
 * Card component to hold the details of each theme in the themes page.
 * 
 * @param theme theme to show information for
 * @param isPreviewed boolean indicating if theme is selected by user to be previewed
 * @param onPreview handles logic for theme selected to be previewed
 * @param onViewMoreInfo handles user action to view more details
 * @param updateFavorites handles user action to favorite theme
 */
const ThemeCard: React.FC<{
  theme: Theme;
  isPreviewed: boolean;
  onPreview: (theme: Theme) => void;
  onViewMoreInfo: (theme: Theme) => void;
  updateFavorites: (theme: Theme, isFavoriting: boolean) => void;
}> = ({
  theme,
  isPreviewed,
  onPreview,
  onViewMoreInfo,
  updateFavorites,
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/themes");

  const isDesktop = useIsDesktop();

  const handleCheckboxChange = () => {
    onPreview(theme);
  };

  const handleFavoriteClick = async () => {
    if (theme.isFavorite) {
      updateFavorites(theme, false);
    } else {
      updateFavorites(theme, true);
    }
  };

  return (
    <Card
      sx={{
        height: isDesktop ? 500 : 460,
        width: isDesktop ? "100%" : "85vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 5,
        border: "2px solid",
        borderColor: isPreviewed ? "primary.main" : "divider",
      }}
    >
      <CardMedia
        component="img"
        image={theme.themeImg}
        alt={theme.name}
        sx={{
          height: isDesktop ? 280 : 240,
          width: "100%",
          objectFit: "cover",
          borderRadius: 5,
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {theme.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            mt: 1,
          }}
        >
          {theme.description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mt: 0.5,
        }}
      >
        <Typography
          variant="body2"
          color="primary"
          onClick={() => onViewMoreInfo(theme)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
            ml: 1.4,
            fontSize: 16,
          }}
        >
          {t("theme_card.more_info")}
        </Typography>

        {/* Row for select and heart icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            mt: 0.5
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isPreviewed}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={t("theme_card.select")}
            sx={{ ml: 0 }}
          />

          {/* Favorites count and Heart icon */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 2, gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                fontSize: '0.875rem'
              }}
            >
              {theme.favoritesCount}
            </Typography>
            <IconButton aria-label="favorite" onClick={handleFavoriteClick}>
              <Heart
                size={20}
                color={theme.isFavorite ? 'red' : 'currentColor'}
                fill={theme.isFavorite ? 'red' : 'none'}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ThemeCard;
