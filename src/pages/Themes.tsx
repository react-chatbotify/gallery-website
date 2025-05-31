import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Badge, Box, CircularProgress, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import FadeInOnView from '@/components/FadeComponent/FadeInOnView';
import GalleryTooltip from '@/components/GalleryTooltip/GalleryTooltip';
import SearchBar from '@/components/SearchBar/SearchBar';
import SortButton from '@/components/SearchBar/SortButton';
import ThemeCard from '@/components/Themes/ThemeCard';
import ThemeModal from '@/components/Themes/ThemeModal';
import ThemePreview from '@/components/Themes/ThemePreview';
import { useAuth } from '@/context/AuthContext';
import { useGlobalModal } from '@/context/GlobalModalContext';
import useActionQueue from '@/hooks/useActionQueue';
import useIsDesktop from '@/hooks/useIsDesktop';
import { useNotify } from '@/hooks/useNotify';
import { Theme } from '@/interfaces/Theme';
import { addThemeToFavorites, fetchThemesFromApi, removeThemeFromFavorites } from '@/services/themes/apiService';

import { Endpoints } from '../constants/Endpoints';
import useFetchThemes from '../hooks/useFetchThemes';

const THEMES_PER_PAGE = Number(import.meta.env.VITE_THEMES_PER_PAGE) || 20;

/**
 * Main component to display and browse themes.
 */
const Themes: React.FC = () => {
  const { t } = useTranslation('pages/themes');
  const { isLoggedIn } = useAuth();
  const { setPromptLogin, setPromptError } = useGlobalModal();
  const notify = useNotify();
  const isDesktop = useIsDesktop();

  // MUI theme & breakpoints for mobile outline
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchThemes, isLoading, error } = useFetchThemes();

  // query parameters state
  const [queryParams, setQueryParams] = useState({
    page: 1,
    searchQuery: searchParams.get('searchQuery') || '',
    sortBy: localStorage.getItem('RCBG_THEME_SORT_BY') ?? 'updatedAt',
  });

  // theme data states
  const [allThemes, setAllThemes] = useState<Theme[]>([]);
  const [previewIds, setPreviewIds] = useState<string[]>([]);
  const [focusedTheme, setFocusedTheme] = useState<Theme | null>(null);
  const [noMoreThemes, setNoMoreThemes] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(
    () => localStorage.getItem('RCBG_THEME_PREVIEW_VISIBLE') === 'true'
  );

  // debounces favoriting of themes in a queue
  const addQueue = useActionQueue<Theme>(addThemeToFavorites, 300);
  const removeQueue = useActionQueue<Theme>(removeThemeFromFavorites, 300);

  /**
   * Update favorites count both locally and via API queue.
   */
  const updateFavorites = useCallback(
    (theme: Theme, isFavoriting: boolean) => {
      if (!isLoggedIn) {
        setPromptLogin(true);
        return;
      }

      isFavoriting ? notify('Theme added to favorites!') : notify('Theme removed from favorites!');

      const queueAction = isFavoriting ? addQueue : removeQueue;
      queueAction(theme);

      // Update local state immediately
      const updateCounts = (item: Theme) =>
        item.id === theme.id
          ? {
              ...item,
              isFavorite: isFavoriting,
              favoritesCount: item.favoritesCount + (isFavoriting ? 1 : -1),
            }
          : item;

      setAllThemes((prev) => prev.map(updateCounts));
      setFocusedTheme((prev) => (prev ? { ...updateCounts(prev) } : prev));
    },
    [isLoggedIn, notify, addQueue, removeQueue, setPromptLogin]
  );

  /**
   * Load themes whenever query parameters change.
   */
  useEffect(() => {
    let canceled = false;
    const load = async () => {
      try {
        const themes = await fetchThemes({
          pageNum: queryParams.page,
          pageSize: THEMES_PER_PAGE,
          searchQuery: queryParams.searchQuery,
          sortBy: queryParams.sortBy,
          sortDirection: 'DESC',
          url: Endpoints.fetchApiThemes,
        });

        if (canceled) return;

        setNoMoreThemes(themes.length < THEMES_PER_PAGE);
        setAllThemes((prev) => (queryParams.page === 1 ? themes : [...prev, ...themes]));
      } catch (err) {
        console.error('Failed to fetch themes:', err);
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, [queryParams, fetchThemes]);

  /**
   * Infinite scroll handler.
   */
  const handleScroll = useCallback(() => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom && !isLoading && !noMoreThemes) {
      setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [isLoading, noMoreThemes]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * Load a focused theme when URL param changes.
   */
  useEffect(() => {
    const loadFocused = async () => {
      const id = searchParams.get('themeId');
      if (!id) return;
      try {
        const [theme] = await fetchThemesFromApi(`${Endpoints.fetchApiThemes}/${encodeURIComponent(id)}`);
        setFocusedTheme(theme);
      } catch (err) {
        console.error('Failed to load theme details:', err);
      }
    };
    loadFocused();
  }, [searchParams]);

  /**
   * Handlers for search and sort.
   */
  const handleSearch = (query: string) => {
    setSearchParams((params) => {
      query ? params.set('searchQuery', query) : params.delete('searchQuery');
      return params;
    });
    setQueryParams({ page: 1, searchQuery: query, sortBy: queryParams.sortBy });
    setAllThemes([]);
    setNoMoreThemes(false);
  };

  const handleSortChange = (sortBy: string) => {
    setQueryParams({ page: 1, searchQuery: queryParams.searchQuery, sortBy });
    localStorage.setItem('RCBG_THEME_SORT_BY', sortBy);
    setAllThemes([]);
    setNoMoreThemes(false);
  };

  /**
   * Toggle preview selection for a theme.
   */
  const togglePreview = useCallback(
    (theme: Theme) => {
      if (!previewIds.length && isDesktop) {
        notify('Open the preview panel on the top right corner to preview selected themes!');
      }
      setPreviewIds((prev) => (prev.includes(theme.id) ? prev.filter((id) => id !== theme.id) : [...prev, theme.id]));
    },
    [previewIds, isDesktop, notify]
  );

  /**
   * Toggle visibility of preview panel.
   */
  const togglePreviewPanel = () => {
    setIsPreviewVisible((visible) => {
      localStorage.setItem('RCBG_THEME_PREVIEW_VISIBLE', String(!visible));
      return !visible;
    });
  };

  // Styles
  const containerStyles = useMemo(
    () => ({
      backgroundColor: 'background.paper',
      display: 'flex',
      width: '100%',
      overflowX: 'hidden',
      minHeight: '100vh',
    }),
    []
  );

  // Redirect on fetch error
  if (error) {
    setPromptError('error_modal.fail_themes_fetch');
    return null;
  }

  return (
    <Box sx={containerStyles}>
      {/* Main Content Section */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 4,
          mr: isDesktop ? (isPreviewVisible ? '30%' : 4) : 0,
          mb: !isDesktop ? (isPreviewVisible ? '50vh' : 4) : 0,
          transition: 'margin 0.3s ease',
        }}
      >
        <FadeInOnView>
          <Typography variant="h4" fontWeight="bold" mb={3}>
            {t('themes.header')}
          </Typography>
          <Typography variant="body2" mb={2} color="text.secondary">
            {t('themes.description')}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <GalleryTooltip
              content={t('theme_tooltip.multiple_themes_usage')}
              placement={isDesktop ? 'right' : 'bottom'}
            >
              <Box display="flex" alignItems="center" color="primary.main">
                <Typography variant="body2" mr={0.5}>
                  {t('themes.how_multiple_themes_work')}
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

        {/* Themes Grid */}
        <Grid container spacing={2}>
          {isLoading && queryParams.page === 1 ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh" width="100%">
              <CircularProgress size={80} />
            </Box>
          ) : (
            allThemes.map((theme) => (
              <Grid item key={theme.id} xs={12} md={6} lg={isPreviewVisible ? 4 : 3}>
                <FadeInOnView>
                  <ThemeCard
                    theme={theme}
                    isPreviewed={previewIds.includes(theme.id)}
                    onPreview={() => togglePreview(theme)}
                    onViewMoreInfo={() => {
                      setSearchParams((params) => {
                        params.set('themeId', theme.id);
                        return params;
                      });
                      setFocusedTheme(theme);
                    }}
                    updateFavorites={updateFavorites}
                  />
                </FadeInOnView>
              </Grid>
            ))
          )}

          {isLoading && queryParams.page > 1 && (
            <Box textAlign="center" width="100%" mt={2}>
              <CircularProgress size={24} />
            </Box>
          )}
        </Grid>
      </Box>

      {/* Preview Panel */}
      <Box
        component="aside"
        sx={{
          position: 'fixed',
          top: isDesktop ? 0 : 'auto',
          bottom: isDesktop ? 'auto' : 0,
          right: 0,
          width: isDesktop ? (isPreviewVisible ? '30%' : '40px') : '100%',
          height: isDesktop ? '100vh' : isPreviewVisible ? '60vh' : 0,
          bgcolor: 'background.paper',
          borderLeft: isDesktop ? '1px solid' : 'none',
          borderColor: 'divider',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          outline: isMobile ? `2px solid ${muiTheme.palette.primary.main}` : 'none',
          outlineOffset: isMobile ? '-2px' : 0,
        }}
      >
        {isPreviewVisible && <ThemePreview previewIds={previewIds} setPreviewIds={setPreviewIds} />}
      </Box>

      {/* Desktop Toggle Button (outside preview panel) */}
      {isDesktop && (
        <IconButton
          onClick={togglePreviewPanel}
          sx={{
            position: 'fixed',
            top: 100,
            transition: 'all 0.3s ease',
            right: isPreviewVisible ? 'calc(30% - 20px)' : '20px',
            bgcolor: 'background.secondaryBtn',
            '&:hover': { bgcolor: 'background.secondaryBtnHover' },
            color: 'text.primary',
            zIndex: 1050,
          }}
        >
          <Badge
            badgeContent={previewIds.length}
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: 'primary.main',
                borderRadius: '50%',
                fontSize: '0.75rem',
                minHeight: '1.25rem',
                minWidth: '1.25rem',
                mt: -1,
                mr: 3,
              },
            }}
          >
            {isPreviewVisible ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Badge>
        </IconButton>
      )}

      {/* Theme Details Modal */}
      {focusedTheme && (
        <ThemeModal
          theme={focusedTheme}
          updateFavorites={updateFavorites}
          onClose={() => {
            setSearchParams((params) => {
              params.delete('themeId');
              return params;
            });
            setFocusedTheme(null);
          }}
        />
      )}

      {/* Mobile Toggle Button */}
      {!isDesktop && (
        <IconButton
          onClick={togglePreviewPanel}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: 'background.secondaryBtn',
            '&:hover': { bgcolor: 'background.secondaryBtnHover' },
            color: 'text.primary',
            zIndex: 1050,
          }}
        >
          <Badge
            badgeContent={previewIds.length}
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: 'primary.main',
                borderRadius: '50%',
                fontSize: '0.75rem',
                height: '1.25rem',
                minWidth: '1.25rem',
                mt: -1,
              },
            }}
          >
            {isPreviewVisible ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </Badge>
        </IconButton>
      )}
    </Box>
  );
};

export default Themes;
