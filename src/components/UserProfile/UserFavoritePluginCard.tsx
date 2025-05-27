import { Box, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Plugin } from '@/interfaces/Plugin';

/**
 * Card component to hold details and actionables for user favorited plugin.
 *
 * @param plugin plugin favorited by user
 * @param removeFavoritePlugin handles user action to remove plugin from favorites
 */
const UserFavoritePluginCard: React.FC<{
  plugin: Plugin;
  removeFavoritePlugin: (plugin: Plugin) => void;
}> = ({ plugin, removeFavoritePlugin }) => {
  // lazy loads translations
  const { t } = useTranslation('components/userprofile');

  const { name, id, imageUrl, description } = plugin;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        height: 'fit-content',
        width: '100%',
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        src={imageUrl}
        alt={name}
        sx={{
          borderRadius: 5,
          height: 224,
          objectFit: 'cover',
          width: '80%',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Title */}
        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          {name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          {description}
        </Typography>

        {/* Links */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            bottom: 0,
            display: 'flex',
            gap: 2,
            position: 'absolute',
          }}
        >
          <Link
            href={`/plugins?pluginId=${encodeURIComponent(id)}`}
            sx={{
              '&:hover': {
                textDecoration: 'underline',
              },
              color: 'primary.main',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            {t('user_favorite_plugin_card.view_plugin')}
          </Link>
          <Typography
            sx={{
              color: 'error.main',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
            onClick={() => removeFavoritePlugin(plugin)}
          >
            {t('user_favorite_plugin_card.remove_favorite')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserFavoritePluginCard;
