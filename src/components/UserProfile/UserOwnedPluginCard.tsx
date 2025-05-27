import { Box, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Plugin } from '@/interfaces/Plugin';

import GalleryTooltip from '../GalleryTooltip/GalleryTooltip';

/**
 * Card component to hold details and actionables for user owned plugin.
 *
 * @param plugin plugin owned by user
 */
const UserOwnedPluginCard: React.FC<{
  plugin: Plugin;
}> = ({ plugin }) => {
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
            {t('user_owned_plugin_card.view_plugin')}
          </Link>
          <GalleryTooltip content="This feature is currently unavailable." placement="top">
            <Typography
              sx={{
                color: 'error.main',
                cursor: 'not-allowed',
                fontSize: '0.875rem',
              }}
            >
              {t('user_owned_plugin_card.manage_plugin')}
            </Typography>
          </GalleryTooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default UserOwnedPluginCard;
