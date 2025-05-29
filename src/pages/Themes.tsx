import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Badge, Box, CircularProgress, Fab, Grid, IconButton, Typography } from '@mui/material';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
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

const THEMES_PER_PAGE = import.meta.env.VITE_THEMES_PER_PAGE;

/**
 * Shows available themes for users to browse.
 */
const Themes: React.FC = () => {
  // lazy load translations
  const { t } = useTranslation('pages/themes');
  const { isLoggedIn } = useAuth();
  const isDesktop = useIsDesktop();
  const { setPromptLogin, setPromptError } = useGlobalModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchThemes, isLoading, error } = useFetchThemes();
  const notify = useNotify();

  const [queryParams, setQueryParams] = useState({
    page: 1,
    searchQuery: searchParams.get('searchQuery') || '',
    sortBy: localStorage.getItem('RCBG_THEME_SORT_BY') ?? 'updatedAt',
  });

  const [focusedTheme, setFocusedTheme] = useState<null | Theme>(null);
  const [previewIds, setPreviewIds] = useState<string[]>([]);
  const [allThemes, setAllThemes] = useState<Theme[]>([]);
  const [noMoreThemes, setNoMoreThemes] = useState<boolean>(false);

  const [isPreviewVisible, setIsPreviewVisible] = useState(() => {
    const isLastVisible = localStorage.getItem('RCBG_THEME_PREVIEW_VISIBLE');
    return isLastVisible === 'true';
  });

  // debounces favoriting of themes in a queue
  const addQueue = useActionQueue<Theme>(addThemeToFavorites, 300);
  const removeQueue = useActionQueue<Theme>(removeThemeFromFavorites, 300);

  const updateFavorites = (theme: Theme, isFavoriting: boolean) => {
    if (!isLoggedIn) {
      setPromptLogin(true);
      return;
    }

    if (isFavoriting) {
      notify('Theme added to favorites!');
      addQueue(theme);
    } else {
      notify('Theme removed from favorites!');
      removeQueue(theme);
    }
    setAllThemes((prev) =>
      prev.map((e) =>
        e.id === theme.id
          ? {
              ...e,
              favoritesCount: isFavoriting ? e.favoritesCount + 1 : e.favoritesCount - 1,
              isFavorite: isFavoriting,
            }
          : e
      )
    );
    setFocusedTheme((prev) => {
      if (prev != null) {
        return {
          ...prev,
          favoritesCount: isFavoriting ? prev.favoritesCount + 1 : prev.favoritesCount - 1,
          isFavorite: isFavoriting,
        };
      }
      return prev;
    });
  };

  // Fetch themes when query params change
  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themes = await fetchThemes({
          pageNum: queryParams.page,
          pageSize: THEMES_PER_PAGE,
          searchQuery: queryParams.searchQuery,
          sortBy: queryParams.sortBy,
          sortDirection: 'DESC',
          url: Endpoints.fetchApiThemes,
        });

        if (themes.length < THEMES_PER_PAGE) {
          setNoMoreThemes(true);
        } else {
          setNoMoreThemes(false);
        }

        setAllThemes((prev) => (queryParams.page === 1 ? themes : [...prev, ...themes]));
      } catch (err) {
        console.error('Failed to fetch themes:', err);
      }
    };

    loadThemes();
  }, [queryParams, fetchThemes]);

  const handleScroll = useCallback(() => {
    const isNearBottom =
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;

    if (!isNearBottom || isLoading || noMoreThemes) {
      return;
    }

    setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadFocusedTheme = async () => {
      const focusedThemeId = searchParams.get('themeId') || '';
      if (focusedThemeId) {
        const theme = await fetchThemesFromApi(`${Endpoints.fetchApiThemes}/${encodeURIComponent(focusedThemeId)}`);
        setFocusedTheme(theme[0]);
      }
    };
    loadFocusedTheme();
  }, [searchParams]);

  // Handlers
  const handleSearch = (query: string) => {
    if (query === '') {
      searchParams.delete('searchQuery');
    } else {
      searchParams.set('searchQuery', query);
    }
    setSearchParams(searchParams);
    setQueryParams({
      page: 1,
      searchQuery: query,
      sortBy: queryParams.sortBy,
    });
    setNoMoreThemes(false);
    setAllThemes([]);
  };

  const handleSortChange = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      sortBy: field,
    }));
    localStorage.setItem('RCBG_THEME_SORT_BY', field);
    setNoMoreThemes(false);
    setAllThemes([]);
  };

  const onPreview = (theme: Theme) => {
    if (previewIds.length === 0 && isDesktop) {
      notify('Open the preview panel on the top right corner to preview selected themes!');
    }
    setPreviewIds((prev) => (prev.includes(theme.id) ? prev.filter((item) => item !== theme.id) : [...prev, theme.id]));
  };

  if (error) {
    setPromptError('error_modal.fail_themes_fetch');
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* Main Content Section */}
      <Box
        sx={{
          flex: 1,
          padding: 4,
          marginRight: isDesktop ? (isPreviewVisible ? '30%' : '40px') : 0,
          marginBottom: !isDesktop ? (isPreviewVisible ? '50vh' : '40px') : 0,
          transition: 'margin 0.3s ease',
        }}
      >
        <Box
          sx={{
            mb: 4,
            mt: { lg: 0, md: 5, sm: 5, xl: 0, xs: 5 },
          }}
        >
          <FadeInOnView>
            <Typography variant="h4" fontWeight="bold" color="text.primary" mb={3}>
              {t('themes.header')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('themes.description')}
            </Typography>
            <GalleryTooltip content={t('theme_tooltip.multiple_themes_usage')} placement="right">
              <Box display="inline-flex" alignItems="center" color="primary.main">
                <Typography variant="body2" sx={{ marginRight: '4px' }}>
                  {t('themes.how_multiple_themes_work')}
                </Typography>
                <IconButton size="small" color="primary">
                  <InfoIcon />
                </IconButton>
              </Box>
            </GalleryTooltip>
            <Box mt={2} display="flex" gap={2}>
              <SearchBar onSearch={handleSearch} />
              <SortButton sortBy={queryParams.sortBy} onSortChange={handleSortChange} />
            </Box>
          </FadeInOnView>
        </Box>
        {/* Themes Grid */}
        <Grid container spacing={2}>
          {isLoading && queryParams.page === 1 ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh" width="300%">
              <CircularProgress size={80} />
            </Box>
          ) : (
            <>
              {allThemes.map((theme) => (
                <Grid item key={theme.id} sm={12} md={6} lg={isPreviewVisible ? 4 : 3}>
                  <FadeInOnView>
                    <ThemeCard
                      theme={theme}
                      isPreviewed={previewIds.includes(theme.id)}
                      onPreview={onPreview}
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
              ))}
              {isLoading && (
                <Box textAlign="center" width="100%" mt={2}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Box>

      {/* Pinned Preview Section (Sticky) */}
      <Box
        sx={{
          alignItems: 'flex-start',
          backgroundColor: 'background.paper',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          height: isDesktop ? '100vh' : isPreviewVisible ? '60vh' : '0px',
          mt: 0,
          position: 'fixed',
          top: isDesktop ? 0 : 'auto',
          right: isDesktop ? 0 : 'auto',
          bottom: isDesktop ? 'auto' : 0,
          left: isDesktop ? 'auto' : 0,
          transition: isDesktop ? 'width 0.3s ease' : 'height 0.3s ease',
          width: isDesktop ? (isPreviewVisible ? '30%' : '40px') : '100%',
          zIndex: 1000,
        }}
      >
        <Box sx={{ height: '100%', position: 'relative', width: '100%' }}>
          {isDesktop && (
            <FadeInOnView>
              <Badge
                badgeContent={previewIds.length}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    fontSize: '0.75rem',
                    height: '1.5rem',
                    minWidth: '1.5rem',
                    mr: 3,
                    mt: 9,
                    zIndex: 1100,
                  },
                }}
              >
                <Fab
                  size="small"
                  onClick={() =>
                    setIsPreviewVisible((v) => {
                      localStorage.setItem('RCBG_THEME_PREVIEW_VISIBLE', String(!v));
                      return !v;
                    })
                  }
                  sx={{
                    position: 'absolute',
                    top: 72,
                    left: -28,
                    boxShadow: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.secondaryBtn',
                    '&:hover': { bgcolor: 'background.secondaryBtnHover' },
                    color: 'text.primary',
                  }}
                >
                  {isPreviewVisible ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Fab>
              </Badge>
            </FadeInOnView>
          )}

          {isPreviewVisible && (
            <Box sx={{ height: '100%' }}>
              <ThemePreview setPreviewIds={setPreviewIds} previewIds={previewIds} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal */}
      {focusedTheme !== null && (
        <ThemeModal
          onClose={() => {
            searchParams.delete('themeId');
            setSearchParams(searchParams);
            setFocusedTheme(null);
          }}
          theme={focusedTheme as Theme}
          updateFavorites={updateFavorites}
        />
      )}

      {/* Mobile toggle button */}
      {!isDesktop && (
        <IconButton
          onClick={() =>
            setIsPreviewVisible((prev) => {
              localStorage.setItem('RCBG_THEME_PREVIEW_VISIBLE', String(!prev));
              return !prev;
            })
          }
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: 'background.secondaryBtn',
            '&:hover': { backgroundColor: 'background.secondaryBtnHover' },
            color: 'text.primary',
            zIndex: 1050,
          }}
        >
          {isPreviewVisible ? (
            <ExpandMoreIcon />
          ) : (
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
              <ExpandLessIcon />
            </Badge>
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default Themes;
