import { Plugin } from "@/interfaces/Plugin";
import { Box, CardMedia, Link, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Card component to hold details and actionables for user favorited plugin.
 *
 * @param plugin plugin favorited by user
 * @param removeFavoritePlugin handles user action to remove plugin from favorites
 */
const UserFavoritePluginCard: React.FC<{
  plugin: Plugin;
  removeFavoritePlugin: (plugin: Plugin) => void;
}> = ({
  plugin,
  removeFavoritePlugin
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/userprofile");

  const { name, id, imageUrl, description } = plugin;

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
        src={imageUrl}
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
            href={`/plugins?pluginId=${encodeURIComponent(id)}`}
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
            {t("user_favorite_plugin_card.view_plugin")}
          </Link>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: "0.875rem",
              color: "error.main",
            }}
            onClick={() => removeFavoritePlugin(plugin)}
          >
            {t("user_favorite_plugin_card.remove_favorite")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserFavoritePluginCard;