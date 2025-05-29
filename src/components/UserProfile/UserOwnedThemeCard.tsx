import { Box, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Theme } from '@/interfaces/Theme';

import GalleryTooltip from '../GalleryTooltip/GalleryTooltip';

/**
 * Card component to hold details and actionables for user owned theme.
 *
 * @param theme theme owned by user
 */
const UserOwnedThemeCard: React.FC<{
  theme: Theme;
}> = ({ theme }) => {
  // lazy loads translations
  const { t } = useTranslation('components/userprofile');
  const { name, id, themeImg, description } = theme;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 3 },
        height: '100%',
        width: '100%',
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        src={themeImg}
        alt={name}
        sx={{
          borderRadius: 2,
          objectFit: 'cover',
          width: { xs: '100%', sm: 180 },
          height: { xs: 'auto', sm: '100%' },
          aspectRatio: { xs: '16/9', sm: 'auto' },
        }}
      />

      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1.5, sm: 3 },
          width: '100%',
          flexGrow: 1,
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
            display: 'flex',
            gap: 2,
            marginTop: { xs: 2, sm: 'auto' },
          }}
        >
          <Link
            href={`/themes?themeId=${encodeURIComponent(id)}`}
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
            {t('user_owned_theme_card.view_theme')}
          </Link>
          <GalleryTooltip content="This feature is currently unavailable." placement="top">
            <Typography
              sx={{
                color: 'error.main',
                cursor: 'not-allowed',
                fontSize: '0.875rem',
              }}
            >
              {t('user_owned_theme_card.manage_theme')}
            </Typography>
          </GalleryTooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default UserOwnedThemeCard;
