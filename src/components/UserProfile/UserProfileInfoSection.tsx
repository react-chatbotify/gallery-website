import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { UserData } from '../../interfaces/UserData';

/**
 * Section to hold basic user profile information.
 *
 * @param userData data belonging to user
 */
const UserProfileInfoSection: React.FC<{
  userData: UserData;
}> = ({ userData }) => {
  // lazy loads translations
  const { t } = useTranslation('components/userprofile');

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        borderRadius: 2,
        boxSizing: 'border-box',
        color: 'text.secondary',
        display: 'grid',
        gap: 2,
        margin: '0 auto',
        maxWidth: '100%',
        mt: 4,
        padding: { xs: 2, sm: 4, md: 6 },
        width: '95vw',
      }}
    >
      {/* Header */}
      <Typography variant="h5" sx={{ color: 'primary.white', fontWeight: 'bold' }}>
        {t('user_profile_info_section.header')}
      </Typography>

      {/* Profile Information */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            src={userData?.avatarUrl}
            alt={userData?.name || 'Avatar'}
            sx={{ borderRadius: 2, height: 44, width: 44 }}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {userData?.name || t('user_profile_info_section.info_unavailable')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData?.handle || t('user_profile_info_section.info_unavailable')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{userData?.status || t('user_profile_info_section.info_unavailable')}</Typography>
        </Grid>
      </Grid>

      {/* Additional Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: userData?.location ? 'inherit' : 'primary.disabledForeground',
                fontWeight: 'bold',
              }}
            >
              {t('user_profile_info_section.location')}
            </Typography>
            <Typography variant="body2">
              {userData?.location || t('user_profile_info_section.info_unavailable')}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: userData?.joinDate ? 'inherit' : 'primary.disabledForeground',
                fontWeight: 'bold',
              }}
            >
              {t('user_profile_info_section.join_date')}
            </Typography>
            <Typography variant="body2">
              {userData?.joinDate || t('user_profile_info_section.info_unavailable')}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: userData?.role ? 'inherit' : 'primary.disabledForeground',
                fontWeight: 'bold',
              }}
            >
              {t('user_profile_info_section.community_role')}
            </Typography>
            <Typography variant="body2">{userData?.role || t('user_profile_info_section.info_unavailable')}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileInfoSection;
