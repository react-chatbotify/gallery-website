import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, Chip, Grid, IconButton, Modal, Typography } from '@mui/material';
import { Heart } from 'lucide-react';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import defaultPluginIcon from '@/assets/images/PluginsPage/default_plugin_icon.webp';
import GalleryTooltip from '@/components/GalleryTooltip/GalleryTooltip';

import { Plugin } from '../../interfaces/Plugin';

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
}> = ({ onClose, plugin, updateFavorites }) => {
  // lazy loads translations
  const { t } = useTranslation('components/plugins');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleFavoriteClick = async () => {
    if (plugin.isFavorite) {
      updateFavorites(plugin, false);
    } else {
      updateFavorites(plugin, true);
    }
  };

  console.log(plugin);

  const modalContent = (
    <Modal open onClose={onClose} aria-labelledby="plugin-modal-title">
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
          spacing={4}
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
            <Box id="plugin-modal-title" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {plugin.name.startsWith('@rcb-plugins/') && (
                <GalleryTooltip content={t('plugin_card.official_plugin_verified')}>
                  <CheckCircleIcon
                    color="primary"
                    sx={{
                      fontSize: '1.75rem',
                      marginRight: 1,
                    }}
                  />
                </GalleryTooltip>
              )}
              <Typography
                variant="h5"
                sx={{
                  color: 'text.primary',
                  fontWeight: 'bold',
                }}
              >
                {plugin.name}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              {plugin.authorImg && (
                <Avatar
                  src={plugin.authorImg}
                  alt={plugin.authorName}
                  sx={{
                    height: 32,
                    mr: 1,
                    width: 32,
                  }}
                />
              )}
              <Typography
                component="a"
                href={`https://github.com/${plugin.authorName}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'gray',
                  fontSize: '1rem',
                  textDecoration: 'underline',
                }}
              >
                {plugin.authorName}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {plugin.keywords.map((tag, index) => (
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
              {plugin.description}
            </Typography>

            <Typography variant="body2" fontWeight="bold" sx={{ color: 'gray', mb: 1 }}>
              {t('plugin_modal.id')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'gray',
                fontSize: '1rem',
                mb: 2,
              }}
            >
              {plugin.id}
            </Typography>

            <Typography variant="body2" fontWeight="bold" sx={{ color: 'gray', mb: 1 }}>
              {t('plugin_modal.version')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'gray',
                fontSize: '1rem',
                mb: 3,
              }}
            >
              {plugin.version}
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
                href={plugin.packageUrl}
                target="_blank"
                variant="contained"
                color="primary"
                sx={{
                  flexGrow: 1,
                  width: 'auto',
                }}
              >
                {t('plugin_modal.view_on_npm')}
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
                    color={plugin.isFavorite ? 'red' : 'currentColor'}
                    fill={plugin.isFavorite ? 'red' : 'none'}
                  />
                </IconButton>
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontSize: '1rem',
                  }}
                >
                  {plugin.favoritesCount} {t('plugin_modal.likes')}
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
              src={plugin.imageUrl || defaultPluginIcon}
              alt={plugin.name}
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

export default PluginModal;
