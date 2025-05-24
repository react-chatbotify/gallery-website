import { Box, Card, CardContent, CardMedia, Checkbox, FormControlLabel, IconButton, Typography } from '@mui/material';
import { Heart } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsDesktop from '@/hooks/useIsDesktop';

import { Theme } from '../../interfaces/Theme';

/**
 * Card component to hold the details of each theme in the themes page.
 *
 * @param theme theme to show information for
 * @param isPreviewed boolean indicating if theme is selected by user to be previewed
 * @param onPreview handles logic for theme selected to be previewed
 * @param onViewMoreInfo handles user action to view more details
 * @param updateFavorites handles user action to favorite theme
 */
const ThemeCard: React.FC<{
  theme: Theme;
  isPreviewed: boolean;
  onPreview: (theme: Theme) => void;
  onViewMoreInfo: (theme: Theme) => void;
  updateFavorites: (theme: Theme, isFavoriting: boolean) => void;
}> = ({ theme, isPreviewed, onPreview, onViewMoreInfo, updateFavorites }) => {
  // lazy loads translations
  const { t } = useTranslation('components/themes');

  const isDesktop = useIsDesktop();

  const handleCheckboxChange = () => {
    onPreview(theme);
  };

  const handleFavoriteClick = async () => {
    if (theme.isFavorite) {
      updateFavorites(theme, false);
    } else {
      updateFavorites(theme, true);
    }
  };

  return (
    <Card
      sx={{
        border: '2px solid',
        borderColor: isPreviewed ? 'primary.main' : 'divider',
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
        image={theme.themeImg}
        alt={theme.name}
        sx={{
          borderRadius: 5,
          height: isDesktop ? 280 : 240,
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {theme.name}
        </Typography>
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
          {theme.description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          mt: 0.5,
        }}
      >
        <Typography
          variant="body2"
          color="primary"
          onClick={() => onViewMoreInfo(theme)}
          sx={{
            '&:hover': {
              textDecoration: 'underline',
            },
            cursor: 'pointer',
            fontSize: 16,
            ml: 1.4,
          }}
        >
          {t('theme_card.more_info')}
        </Typography>

        {/* Row for select and heart icon */}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 0.5,
            width: '100%',
          }}
        >
          <FormControlLabel
            control={<Checkbox checked={isPreviewed} onChange={handleCheckboxChange} color="primary" />}
            label={t('theme_card.select')}
            sx={{ ml: 0 }}
          />

          {/* Favorites count and Heart icon */}
          <Box sx={{ alignItems: 'center', display: 'flex', gap: 1, ml: 2 }}>
            <Typography
              sx={{
                color: 'text.primary',
                fontSize: '0.875rem',
                fontWeight: 'bold',
              }}
            >
              {theme.favoritesCount}
            </Typography>
            <IconButton aria-label="favorite" onClick={handleFavoriteClick}>
              <Heart
                size={20}
                color={theme.isFavorite ? 'red' : 'currentColor'}
                fill={theme.isFavorite ? 'red' : 'none'}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ThemeCard;
