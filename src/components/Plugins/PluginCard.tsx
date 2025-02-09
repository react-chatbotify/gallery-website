import useIsDesktop from "@/hooks/useIsDesktop";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";
import { Heart } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Plugin } from "../../interfaces/Plugin";

/**
 * Card component to hold the details of each plugin in the plugins page.
 *
 * @param plugin plugin to show information for
 * @param onViewMoreInfo handles user action to view more details
 * @param updateFavorites handles user action to favorite plugin
 */
const PluginCard: React.FC<{
  plugin: Plugin;
  onViewMoreInfo: (plugin: Plugin) => void;
  updateFavorites: (plugin: Plugin, isFavoriting: boolean) => void;
}> = ({
  plugin,
  onViewMoreInfo,
  updateFavorites
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/plugins");

  const isDesktop = useIsDesktop();

  const handleFavoriteClick = async () => {
    if (plugin.isFavorite) {
      updateFavorites(plugin, false);
    } else {
      updateFavorites(plugin, true);
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
        borderColor: "divider",
      }}
    >
      <CardMedia
        component="img"
        image={plugin.imageUrl}
        alt={plugin.name}
        sx={{
          height: isDesktop ? 280 : 240,
          width: "100%",
          objectFit: "cover",
          borderRadius: 5,
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {plugin.name}
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
          {plugin.description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mt: 0.5
        }}
      >
        <Typography
          variant="body2"
          color="primary"
          onClick={() => onViewMoreInfo(plugin)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
            ml: 1.4,
            fontSize: 16,
          }}
        >
          {t("plugin_card.more_info")}
        </Typography>

        {/* Favorites count and Heart icon */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2, gap: 1 }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              fontSize: '0.875rem'
            }}
          >
            {plugin.favoritesCount}
          </Typography>
          <IconButton aria-label="favorite" onClick={handleFavoriteClick}>
            <Heart
              size={20}
              color={plugin.isFavorite ? 'red' : 'currentColor'}
              fill={plugin.isFavorite ? 'red' : 'none'}
            />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default PluginCard;
