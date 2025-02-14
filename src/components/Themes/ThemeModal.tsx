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
import { Theme } from "../../interfaces/Theme";
import { downloadThemeContent } from "../../utils";

/**
 * Modal to popup for showing theme details.
 *
 * @param onClose handles closing of modal
 * @param theme theme to show details for
 * @param updateFavorites handles user action to favorite theme
 */
const ThemeModal: React.FC<{
  onClose: () => void;
  theme: Theme;
  updateFavorites: (theme: Theme, isFavoriting: boolean) => void;
}> = ({ onClose, theme, updateFavorites }) => {
  const { t } = useTranslation("components/themes");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleFavoriteClick = async () => {
    if (theme.isFavorite) {
      updateFavorites(theme, false);
    } else {
      updateFavorites(theme, true);
    }
  };

  const onDownload = () => {
    downloadThemeContent(
      theme.content.settings,
      theme.content.inlineStyles,
      theme.content.cssStyles,
      theme.name
    );
  };

  const modalContent = (
    <Modal open onClose={onClose} aria-labelledby="theme-modal-title">
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
          p: 2,
          paddingTop: 1,
          maxWidth: "800px",
          maxHeight: "80vh",
          overflow: "auto",
          width: "90%",
          marginTop: { xs: 4, md: 0 },
        }}
      >
        <IconButton onClick={onClose} sx={{ paddingRight: 0 }}>
          <CloseIcon />
        </IconButton>

        <Grid
          container
          spacing={2}
          sx={{
            p: 2,
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              paddingRight: { xs: 0, md: 2 },
            }}
            spacing={0}
          >
            <Typography
              id="theme-modal-title"
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                mb: 1,
              }}
            >
              {theme.name}
            </Typography>

            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              {theme.authorImg && (
                <Avatar
                  src={theme.authorImg}
                  alt={theme.authorName}
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                  }}
                />
              )}
              <Typography
                component="a"
                href={`https://github.com/${theme.github}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "gray",
                  textDecoration: "underline",
                  fontSize: "1rem",
                }}
              >
                {theme.authorName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {theme.tags.map((tag, index) => (
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
              {theme.description}
            </Typography>

            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: "gray", mb: 1 }}
            >
              {t("theme_modal.id")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: "1rem",
                mb: 2,
              }}
            >
              {theme.id}
            </Typography>

            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: "gray", mb: 1 }}
            >
              {t("theme_modal.version")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "gray",
                fontSize: "1rem",
                mb: 3,
              }}
            >
              {theme.version}
            </Typography>

            <Box
              mt={3}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: { xs: "100%", md: "auto" },
                py: 2,
              }}
            >
              <Button
                onClick={onDownload}
                variant="contained"
                color="primary"
                sx={{
                  width: "auto",
                  flexGrow: 1,
                }}
              >
                {t("theme_modal.download_theme")}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: { xs: "flex-start", md: "flex-end" },
                  gap: 0,
                }}
              >
                <IconButton
                  aria-label="favorite"
                  onClick={handleFavoriteClick}
                  sx={{
                    padding: 1,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <Heart
                    size={20}
                    color={theme.isFavorite ? "red" : "currentColor"}
                    fill={theme.isFavorite ? "red" : "none"}
                  />
                </IconButton>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: "1rem",
                  }}
                >
                  {theme.favoritesCount} {t("theme_modal.likes")}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            sx={{
              paddingRight: { xs: 0, md: 2 },
            }}
          >
            <Box
              component="img"
              src={theme.themeImg}
              alt={theme.name}
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

export default ThemeModal;
