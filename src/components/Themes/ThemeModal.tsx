import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, Chip, Grid, IconButton, Modal, Typography } from '@mui/material';
import { Heart } from 'lucide-react';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Theme } from '../../interfaces/Theme';
import { downloadThemeContent } from '../../utils';

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
  const { t } = useTranslation('components/themes');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleFavoriteClick = async () => {
    if (theme.isFavorite) {
      updateFavorites(theme, false);
    } else {
      updateFavorites(theme, true);
    }
  };

  const onDownload = () => {
    downloadThemeContent(theme.content.settings, theme.content.inlineStyles, theme.content.cssStyles, theme.name);
  };

  const modalContent = (
    <Modal open onClose={onClose} aria-labelledby="theme-modal-title">
      <Box
        ref={modalRef}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 2,
          boxShadow: 24,
          left: '50%',
          marginTop: { md: 0, xs: 4 },
          maxHeight: '80vh',
          maxWidth: '800px',
          overflow: 'auto',
          p: 2,
          paddingTop: 1,
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: { md: 'row', xs: 'column-reverse' },
            p: 2,
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              paddingRight: { md: 2, xs: 0 },
            }}
            spacing={0}
          >
            <Typography
              id="theme-modal-title"
              variant="h5"
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
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
                    height: 32,
                    mr: 1,
                    width: 32,
                  }}
                />
              )}
              <Typography
                component="a"
                href={`https://github.com/${theme.github}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'gray',
                  fontSize: '1rem',
                  textDecoration: 'underline',
                }}
              >
                {theme.authorName}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {theme.tags.map((tag, index) => (
                <Chip key={`tag-${index}`} label={tag} />
              ))}
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'gray',
                fontSize: '1rem',
                mb: 3,
              }}
            >
              {theme.description}
            </Typography>

            <Typography variant="body2" fontWeight="bold" sx={{ color: 'gray', mb: 1 }}>
              {t('theme_modal.id')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'gray',
                fontSize: '1rem',
                mb: 2,
              }}
            >
              {theme.id}
            </Typography>

            <Typography variant="body2" fontWeight="bold" sx={{ color: 'gray', mb: 1 }}>
              {t('theme_modal.version')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'gray',
                fontSize: '1rem',
                mb: 3,
              }}
            >
              {theme.version}
            </Typography>

            <Box
              mt={3}
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: 1,
                py: 2,
                width: { md: 'auto', xs: '100%' },
              }}
            >
              <Button
                onClick={onDownload}
                variant="contained"
                color="primary"
                sx={{
                  flexGrow: 1,
                  width: 'auto',
                }}
              >
                {t('theme_modal.download_theme')}
              </Button>

              <Box
                sx={{
                  alignItems: 'center',
                  alignSelf: { md: 'flex-end', xs: 'flex-start' },
                  display: 'flex',
                  gap: 0,
                }}
              >
                <IconButton
                  aria-label="favorite"
                  onClick={handleFavoriteClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    padding: 1,
                  }}
                >
                  <Heart
                    size={20}
                    color={theme.isFavorite ? 'red' : 'currentColor'}
                    fill={theme.isFavorite ? 'red' : 'none'}
                  />
                </IconButton>
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontSize: '1rem',
                  }}
                >
                  {theme.favoritesCount} {t('theme_modal.likes')}
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
              paddingRight: { md: 2, xs: 0 },
            }}
          >
            <Box
              component="img"
              src={theme.themeImg}
              alt={theme.name}
              sx={{
                borderRadius: 2,
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'cover',
                width: '100%',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-container') || document.body);
};

export default ThemeModal;
