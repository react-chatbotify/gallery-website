import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Heart } from "lucide-react";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { Plugin } from "../../interfaces/Plugin";

/**
 * Modal to popup for showing plugin details.
 * 
 * @param onClose handles closing of modal
 * @param plugin plugin to show details for
 * @param updateFavorites handles user action to favorite plugin
 */
const PluginModal: React.FC<{
  onClose: () => void;
  plugin: Plugin;
  updateFavorites: (plugin: Plugin, isFavoriting: boolean) => void;
}> = ({
  onClose, 
  plugin,
  updateFavorites
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/plugins");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleFavoriteClick = async () => {
    if (plugin.isFavorite) {
      updateFavorites(plugin, false);
    } else {
      updateFavorites(plugin, true);
    }
  };

  const modalContent = (
    <Modal open onClose={onClose} aria-labelledby="plugin-modal-title">
      <Box
        ref={modalRef}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxWidth: "800px",
          width: "90%",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              id="plugin-modal-title"
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                mb: 1,
              }}
            >
              {plugin.name}
            </Typography>

            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              {plugin.authorImg && (
                <Avatar
                  src={plugin.authorImg}
                  alt={plugin.authorName}
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                  }}
                />
              )}
              <Typography
                component="a"
                href={`https://github.com/${plugin.github}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "gray",
                  textDecoration: "underline",
                  fontSize: "1rem",
                }}
              >
                {plugin.authorName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {plugin.keywords.map((tag, index) => (
                <Chip key={`tag-${index}`} label={tag} />
              ))}
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: "1rem",
                mb: 3,
              }}
            >
              {plugin.description}
            </Typography>

            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: "gray", mb: 1 }}
            >
              {t("plugin_modal.id")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: "1rem",
                mb: 2,
              }}
            >
              {plugin.id}
            </Typography>

            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: "gray", mb: 1 }}
            >
              {t("plugin_modal.version")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: "1rem",
                mb: 3,
              }}
            >
              {plugin.version}
            </Typography>

            <Box
              mt={3}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Button
                href={plugin.packageUrl}
                variant="contained"
                color="primary"
                sx={{
                  width: { xs: "100%", md: "auto" },
                }}
              >
                {t("plugin_modal.download_plugin")}
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
                <IconButton 
                  aria-label="favorite"
                  onClick={handleFavoriteClick}
                  sx={{
                    padding: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Heart
                    size={20}
                    color={plugin.isFavorite ? 'red' : 'currentColor'}
                    fill={plugin.isFavorite ? 'red' : 'none'}
                  />
                </IconButton>
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontSize: '1rem'
                  }}
                >
                  {plugin.favoritesCount} {t("plugin_modal.likes")}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              component="img"
              src={plugin.imageUrl}
              alt={plugin.name}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-container") || document.body
  );
};

export default PluginModal;