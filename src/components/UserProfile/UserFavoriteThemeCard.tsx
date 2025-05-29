import { Box, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Theme } from '@/interfaces/Theme';

/**
 * Card component to hold details and actionables for user favorited theme.
 *
 * @param theme theme favorited by user
 * @param removeFavoriteTheme handles user action to remove theme from favorites
 */
const UserFavoriteThemeCard: React.FC<{
  theme: Theme;
  removeFavoriteTheme: (theme: Theme) => void;
}> = ({ theme, removeFavoriteTheme }) => {
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
            {t('user_favorite_theme_card.view_theme')}
          </Link>
          <Typography
            sx={{
              color: 'error.main',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
            onClick={() => removeFavoriteTheme(theme)}
          >
            {t('user_favorite_theme_card.remove_favorite')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserFavoriteThemeCard;
