import { useNotify } from '@/hooks/useNotify';
import { Plugin } from '@/interfaces/Plugin';
import { removePluginFromFavorites } from '@/services/plugins/apiService';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EmptySVG from '../../assets/images/empty_card.svg';
import UserFavoritePluginCard from './UserFavoritePluginCard';
import UserOwnedPluginCard from './UserOwnedPluginCard';

/**
 * Section to hold user favorited/owned plugins.
 *
 * @param plugins plugins to show
 * @param isLoading boolean indicating if still loading section
 * @param selectedPluginType string indicating if plugins shown are owned or favorited
 * @param onTogglePluginType handles logic for when user toggles plugin type
 */
const UserProfilePluginSection: React.FC<{
  plugins: Plugin[];
  isLoading: boolean;
  selectedPluginType: 'personal' | 'favorite';
  onTogglePluginType: (type: 'personal' | 'favorite') => void;
}> = ({
  plugins,
  isLoading,
  selectedPluginType,
  onTogglePluginType,
}) => {
  // lazy loads translations
  const { t } = useTranslation('components/userprofile');
  const navigate = useNavigate();
  const notify = useNotify();
  const [selectedPlugins, setSelectedPlugins] = useState<Plugin[]>([]);
  
  useEffect(() => {
    setSelectedPlugins(plugins);
  }, [plugins]);

  const removeFavoritePlugin = (plugin: Plugin) => {
    notify("Plugin removed from favorites!");
    setSelectedPlugins((prevPlugins) => prevPlugins.filter((t) => t.id !== plugin.id));
    removePluginFromFavorites(plugin);
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        width: '95vw',
        margin: '0 auto',
        padding: 8,
        backgroundColor: 'background.paper',
        color: 'text.secondary',
        display: 'grid',
        gap: 2,
        mt: 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {t('user_profile_plugin_section.header')}
        </Typography>

        {/* Toggle buttons moved here, inside UserProfilePluginSection */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={selectedPluginType === 'favorite' ? 'contained' : 'outlined'}
            onClick={() => onTogglePluginType('favorite')}
          >
            {t('user_profile_plugin_section.favorite')}
          </Button>
          <Button
            variant={selectedPluginType === 'personal' ? 'contained' : 'outlined'}
            onClick={() => onTogglePluginType('personal')}
          >
            {t('user_profile_plugin_section.personal')}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : selectedPlugins.length > 0 ? (
        <Grid container spacing={3}>
          {selectedPlugins.map((plugin: Plugin, index: number) => (
            <Grid item xs={12} sm={6} key={index}>
              {selectedPluginType === 'personal' ? (
                <UserOwnedPluginCard plugin={plugin} />
              ) : (
                <UserFavoritePluginCard plugin={plugin} removeFavoritePlugin={removeFavoritePlugin} />
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            justifyItems: 'center',
            alignplugins: 'center',
            textAlign: 'center',
            padding: 2,
          }}
        >
          <img src={EmptySVG} alt="Empty" />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {t('user_profile_plugin_section.empty_plugins')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {t('user_profile_plugin_section.prompt_action')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={() => navigate("/plugins")}>
              {t('user_profile_plugin_section.browse_plugins')}
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate("/plugin-builder")}>
              {t('user_profile_plugin_section.build_plugin')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserProfilePluginSection;
