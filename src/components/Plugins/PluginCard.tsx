import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Heart } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import defaultPluginIcon from '@/assets/images/PluginsPage/default_plugin_icon.webp';
import GalleryTooltip from '@/components/GalleryTooltip/GalleryTooltip';
import useIsDesktop from '@/hooks/useIsDesktop';

import { Plugin } from '../../interfaces/Plugin';

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
}> = ({ plugin, onViewMoreInfo, updateFavorites }) => {
  // lazy loads translations
  const { t } = useTranslation('components/plugins');

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
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        height: isDesktop ? 500 : 460,
        justifyContent: 'space-between',
        p: 2,
        width: isDesktop ? '100%' : '85vw',
      }}
    >
      <CardMedia
        component="img"
        image={plugin.imageUrl || defaultPluginIcon}
        alt={plugin.name}
        sx={{
          borderRadius: 5,
          height: isDesktop ? 280 : 240,
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {plugin.name.startsWith('@rcb-plugins/') && (
            <GalleryTooltip content={t('plugin_card.official_plugin_verified')} placement="top">
              <CheckCircleIcon color="primary" sx={{ fontSize: '1.25rem', mr: 1, mt: 1 }} />
            </GalleryTooltip>
          )}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {plugin.name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {plugin.description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          mt: 0.5,
          width: '100%',
        }}
      >
        <Typography
          variant="body2"
          color="primary"
          onClick={() => onViewMoreInfo(plugin)}
          sx={{
            '&:hover': {
              textDecoration: 'underline',
            },
            cursor: 'pointer',
            fontSize: 16,
            ml: 1.4,
          }}
        >
          {t('plugin_card.more_info')}
        </Typography>

        {/* Favorites count and Heart icon */}
        <Box sx={{ alignItems: 'center', display: 'flex', gap: 1, ml: 2 }}>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '0.875rem',
              fontWeight: 'bold',
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
