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
}> = ({
  userData
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/userprofile");

  return (
    <Box
      sx={{
        width: '95vw',
        maxWidth: '100%',
        margin: '0 auto',
        padding: 8,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        color: 'text.secondary',
        display: 'grid',
        gap: 2,
        boxSizing: 'border-box',
        mt: 4,
      }}
    >
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.white' }}>
        {t("user_profile_info_section.header")}
      </Typography>

      {/* Profile Information */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            src={userData?.avatarUrl}
            alt={userData?.name || 'Avatar'}
            sx={{ width: 44, height: 44, borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {userData?.name || 'Name Unavailable'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData?.handle || 'Handle Unavailable'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{userData?.status || 'No status provided'}</Typography>
        </Grid>
      </Grid>

      {/* Additional Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: userData?.location ? 'inherit' : 'primary.disabledForeground',
              }}
            >
              {t("user_profile_info_section.location")}
            </Typography>
            <Typography variant="body2">{userData?.location || 'Not specified'}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: userData?.joinDate ? 'inherit' : 'primary.disabledForeground',
              }}
            >
              {t("user_profile_info_section.join_date")}
            </Typography>
            <Typography variant="body2">{userData?.joinDate || 'Not specified'}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: userData?.role ? 'inherit' : 'primary.disabledForeground',
              }}
            >
              {t("user_profile_info_section.community_role")}
            </Typography>
            <Typography variant="body2">{userData?.role || 'Not specified'}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileInfoSection;
