import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useNotify } from '@/hooks/useNotify';
import { Theme } from '@/interfaces/Theme';
import { removeThemeFromFavorites } from '@/services/themes/apiService';

import EmptySVG from '../../assets/images/empty_card.svg';
import UserFavoriteThemeCard from './UserFavoriteThemeCard';
import UserOwnedThemeCard from './UserOwnedThemeCard';

/**
 * Section to hold user favorited/owned themes.
 *
 * @param themes themes to show
 * @param isLoading boolean indicating if still loading section
 * @param selectedThemeType string indicating if themes shown are owned or favorited
 * @param onToggleThemeType handles logic for when user toggles theme type
 */
const UserProfileThemeSection: React.FC<{
  themes: Theme[];
  isLoading: boolean;
  selectedThemeType: 'personal' | 'favorite';
  onToggleThemeType: (type: 'personal' | 'favorite') => void;
}> = ({ themes, isLoading, selectedThemeType, onToggleThemeType }) => {
  // lazy loads translations
  const { t } = useTranslation('components/userprofile');
  const navigate = useNavigate();
  const notify = useNotify();
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);

  useEffect(() => {
    setSelectedThemes(themes);
  }, [themes]);

  const removeFavoriteTheme = (theme: Theme) => {
    notify('Theme removed from favorites!');
    setSelectedThemes((prevThemes) => prevThemes.filter((t) => t.id !== theme.id));
    removeThemeFromFavorites(theme);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        borderRadius: 2,
        color: 'text.secondary',
        display: 'grid',
        gap: 2,
        margin: '0 auto',
        mt: 4,
        padding: { xs: 2, sm: 4, md: 6 },
        width: '95vw',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {t('user_profile_theme_section.header')}
        </Typography>

        {/* Toggle buttons moved here, inside UserProfileThemeSection */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={selectedThemeType === 'favorite' ? 'contained' : 'outlined'}
            onClick={() => onToggleThemeType('favorite')}
          >
            {t('user_profile_theme_section.favorite')}
          </Button>
          <Button
            variant={selectedThemeType === 'personal' ? 'contained' : 'outlined'}
            onClick={() => onToggleThemeType('personal')}
          >
            {t('user_profile_theme_section.personal')}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      {isLoading ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: 200,
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : selectedThemes.length > 0 ? (
        <Grid container spacing={3}>
          {selectedThemes.map((theme: Theme, index: number) => (
            <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex' }}>
              {selectedThemeType === 'personal' ? (
                <UserOwnedThemeCard theme={theme} />
              ) : (
                <UserFavoriteThemeCard theme={theme} removeFavoriteTheme={removeFavoriteTheme} />
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            alignthemes: 'center',
            display: 'grid',
            gap: 3,
            justifyItems: 'center',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <img src={EmptySVG} alt="Empty" />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {selectedThemeType === 'personal' ? (
                <>{t('user_profile_theme_section.empty_personal_themes')}</>
              ) : (
                <>{t('user_profile_theme_section.empty_favorited_themes')}</>
              )}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t('user_profile_theme_section.prompt_action')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={() => navigate('/themes')}>
              {t('user_profile_theme_section.browse_themes')}
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate('/theme-builder')}>
              {t('user_profile_theme_section.build_theme')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserProfileThemeSection;
