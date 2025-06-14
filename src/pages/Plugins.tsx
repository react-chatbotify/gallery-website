import InfoIcon from '@mui/icons-material/Info';
import { Box, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import FadeInOnView from '@/components/FadeComponent/FadeInOnView';
import GalleryTooltip from '@/components/GalleryTooltip/GalleryTooltip';
import PluginCard from '@/components/Plugins/PluginCard';
import PluginModal from '@/components/Plugins/PluginModal';
import SearchBar from '@/components/SearchBar/SearchBar';
import SortButton from '@/components/SearchBar/SortButton';
import { useAuth } from '@/context/AuthContext';
import { useGlobalModal } from '@/context/GlobalModalContext';
import useActionQueue from '@/hooks/useActionQueue';
import useIsDesktop from '@/hooks/useIsDesktop';
import { useNotify } from '@/hooks/useNotify';
import { Plugin } from '@/interfaces/Plugin';
import { addPluginToFavorites, fetchPluginsFromApi, removePluginFromFavorites } from '@/services/plugins/apiService';

import { Endpoints } from '../constants/Endpoints';
import useFetchPlugins from '../hooks/useFetchPlugins';

const PLUGINS_PER_PAGE = import.meta.env.VITE_PLUGINS_PER_PAGE;

/**
 * Shows available plugins for users to browse.
 */
const Plugins: React.FC = () => {
  // lazy load translations
  const { t } = useTranslation('pages/plugins');
  const { isLoggedIn } = useAuth();
  const { setPromptLogin, setPromptError } = useGlobalModal();
  const notify = useNotify();
  const isDesktop = useIsDesktop();

  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchPlugins, isLoading, error } = useFetchPlugins();

  // lock to prevent multiple simultaneous page increments
  const fetchLockRef = useRef(false);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    searchQuery: searchParams.get('searchQuery') || '',
    sortBy: localStorage.getItem('RCBG_PLUGIN_SORT_BY') ?? 'updatedAt',
  });

  const [focusedPlugin, setFocusedPlugin] = useState<null | Plugin | Partial<Plugin>>(null);
  const [allPlugins, setAllPlugins] = useState<Plugin[]>([]);
  const [noMorePlugins, setNoMorePlugins] = useState<boolean>(false);

  // debounces favoriting of plugins in a queue
  const addQueue = useActionQueue<Plugin>(addPluginToFavorites, 300);
  const removeQueue = useActionQueue<Plugin>(removePluginFromFavorites, 300);

  const updateFavorites = (plugin: Plugin, isFavoriting: boolean) => {
    if (!isLoggedIn) {
      setPromptLogin(true);
      return;
    }

    if (isFavoriting) {
      notify('Plugin added to favorites!');
      addQueue(plugin);
    } else {
      notify('Plugin removed from favorites!');
      removeQueue(plugin);
    }
    setAllPlugins((prev) =>
      prev.map((e) =>
        e.id === plugin.id
          ? {
              ...e,
              favoritesCount: isFavoriting ? e.favoritesCount + 1 : e.favoritesCount - 1,
              isFavorite: isFavoriting,
            }
          : e
      )
    );
    setFocusedPlugin((prev) => {
      if (prev != null && prev.favoritesCount) {
        return {
          ...prev,
          favoritesCount: isFavoriting ? prev.favoritesCount + 1 : prev.favoritesCount - 1,
          isFavorite: isFavoriting,
        };
      }
      return prev;
    });
  };

  // Fetch plugins when query params change
  useEffect(() => {
    let canceled = false;
    const loadPlugins = async () => {
      fetchLockRef.current = true;

      try {
        const plugins = await fetchPlugins({
          pageNum: queryParams.page,
          pageSize: PLUGINS_PER_PAGE,
          searchQuery: queryParams.searchQuery,
          sortBy: queryParams.sortBy,
          sortDirection: 'DESC',
          url: Endpoints.fetchApiPlugins,
        });

        if (canceled) {
          return;
        }

        setNoMorePlugins(plugins.length < PLUGINS_PER_PAGE);
        setAllPlugins((prev) => (queryParams.page === 1 ? plugins : [...prev, ...plugins]));
        fetchLockRef.current = false;
      } catch (err) {
        console.error('Failed to fetch plugins:', err);
      }
    };

    loadPlugins();
    return () => {
      canceled = true;
    };
  }, [queryParams, fetchPlugins]);

  const handleScroll = useCallback(() => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom && !isLoading && !noMorePlugins && !fetchLockRef.current) {
      fetchLockRef.current = true;
      setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [isLoading, noMorePlugins]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadFocusedPlugin = async () => {
      const focusedPluginId = searchParams.get('pluginId') || '';
      if (focusedPluginId) {
        const plugins = await fetchPluginsFromApi(
          `${Endpoints.fetchApiPlugins}/${encodeURIComponent(focusedPluginId)}`
        );
        setFocusedPlugin(plugins[0]);
      }
    };
    loadFocusedPlugin();
  }, [searchParams]);

  // Handlers
  const handleSearch = (query: string) => {
    if (query === '') {
      searchParams.delete('searchQuery');
    } else {
      searchParams.set('searchQuery', query);
    }
    setSearchParams(searchParams);
    setQueryParams({ page: 1, searchQuery: query, sortBy: queryParams.sortBy });
    setNoMorePlugins(false);
    setAllPlugins([]);
  };

  const handleSortChange = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      sortBy: field,
    }));
    localStorage.setItem('RCBG_PLUGIN_SORT_BY', field);
    setNoMorePlugins(false);
    setAllPlugins([]);
  };

  // Styles
  const containerStyles = useMemo(
    () => ({
      backgroundColor: 'background.paper',
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
    }),
    []
  );

  if (error) {
    setPromptError('error_modal.fail_plugins_fetch');
    return;
  }

  return (
    <Box sx={containerStyles}>
      {/* Main Content Section */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 4,
          mr: 4,
          mb: 4,
          mt: { xs: 5, lg: 0 },
          ml: isDesktop ? 4 : 0,
        }}
      >
        <FadeInOnView>
          <Typography variant="h4" fontWeight="bold" mb={3}>
            {t('plugins.header')}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {t('plugins.description')}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <GalleryTooltip content={t('plugin_tooltip.plugin_usage')} placement={isDesktop ? 'right' : 'bottom'}>
              <Box display="inline-flex" alignItems="center" color="primary.main">
                <Typography variant="body2" sx={{ marginRight: '4px' }}>
                  {t('plugins.how_plugins_work')}
                </Typography>
                <IconButton size="small" color="primary">
                  <InfoIcon />
                </IconButton>
              </Box>
            </GalleryTooltip>
          </Box>
          <Box display="flex" gap={2} mb={4}>
            <SearchBar onSearch={handleSearch} />
            <SortButton sortBy={queryParams.sortBy} onSortChange={handleSortChange} />
          </Box>
        </FadeInOnView>

        {/* Plugins Grid */}
        <Grid container spacing={2}>
          {isLoading && queryParams.page === 1 ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh" width="100%">
              <CircularProgress size={80} />
            </Box>
          ) : (
            <>
              {allPlugins.map((plugin) => (
                <Grid item key={plugin.id} xs={12} sm={6} md={4} xl={3}>
                  <FadeInOnView>
                    <PluginCard
                      plugin={plugin}
                      onViewMoreInfo={() => {
                        setSearchParams((params) => {
                          params.set('pluginId', plugin.id);
                          return params;
                        });
                        setFocusedPlugin(plugin);
                      }}
                      updateFavorites={updateFavorites}
                    />
                  </FadeInOnView>
                </Grid>
              ))}
              {isLoading && queryParams.page > 1 && (
                <Box textAlign="center" width="100%" mt={2}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Box>

      {/* Modal */}
      {focusedPlugin !== null && (
        <PluginModal
          onClose={() => {
            searchParams.delete('pluginId');
            setSearchParams(searchParams);
            setFocusedPlugin(null);
          }}
          plugin={focusedPlugin as Plugin}
          updateFavorites={updateFavorites}
        />
      )}
    </Box>
  );
};

export default Plugins;
