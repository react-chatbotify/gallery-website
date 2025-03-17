import InfoIcon from "@mui/icons-material/Info";
import { Badge, Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import GalleryTooltip from "@/components/GalleryTooltip/GalleryTooltip";
import SearchBar from "@/components/SearchBar/SearchBar";
import SortButton from "@/components/SearchBar/SortButton";
import ThemeCard from "@/components/Themes/ThemeCard";
import ThemeModal from "@/components/Themes/ThemeModal";
import ThemePreview from "@/components/Themes/ThemePreview";
import { useAuth } from "@/context/AuthContext";
import { useGlobalModal } from "@/context/GlobalModalContext";
import useActionQueue from "@/hooks/useActionQueue";
import useIsDesktop from "@/hooks/useIsDesktop";
import { useNotify } from "@/hooks/useNotify";
import { Theme } from "@/interfaces/Theme";
import { addThemeToFavorites, fetchThemesFromApi, removeThemeFromFavorites } from "@/services/themes/apiService";
import { useTranslation } from "react-i18next";
import { Endpoints } from "../constants/Endpoints";
import useFetchThemes from "../hooks/useFetchThemes";

const THEMES_PER_PAGE = import.meta.env.VITE_THEMES_PER_PAGE;

/**
 * Shows available themes for users to browse.
 */
const Themes: React.FC = () => {
  // lazy load translations
  const { t } = useTranslation("pages/themes");
  const { isLoggedIn } = useAuth();
  const isDesktop = useIsDesktop();
  const { setPromptLogin, setPromptError } = useGlobalModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchThemes, isLoading, error } = useFetchThemes();
  const notify = useNotify();
  
  const [queryParams, setQueryParams] = useState({
    page: 1,
    sortBy: localStorage.getItem("RCBG_THEME_SORT_BY") ?? "updatedAt",
    searchQuery: searchParams.get("searchQuery") || "",
  });
  
  const [focusedTheme, setFocusedTheme] = useState<null | Theme>(null);
  const [previewIds, setPreviewIds] = useState<string[]>([]);
  const [allThemes, setAllThemes] = useState<Theme[]>([]);
  const [noMoreThemes, setNoMoreThemes] = useState<boolean>(false);

  const [isPreviewVisible, setIsPreviewVisible] = useState(() => {
    const isLastVisible = localStorage.getItem("RCBG_THEME_PREVIEW_VISIBLE");
    return isLastVisible === "true";
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
      notify("Theme added to favorites!");
      addQueue(theme);
    } else {
      notify("Theme removed from favorites!");
      removeQueue(theme);
    }
    setAllThemes(prev =>
      prev.map(e =>
        e.id === theme.id
          ? {
            ...e,
            isFavorite: isFavoriting,
            favoritesCount: isFavoriting ? e.favoritesCount + 1 : e.favoritesCount - 1,
          }
          : e
      )
    );
    setFocusedTheme(prev => {
      if (prev != null) {
        return {
          ...prev,
          isFavorite: isFavoriting,
          favoritesCount: isFavoriting ? prev.favoritesCount + 1 : prev.favoritesCount - 1,
        }
      }
      return prev;
    })
  };

  // Fetch themes when query params change
  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themes = await fetchThemes({
          url: Endpoints.fetchApiThemes,
          pageSize: THEMES_PER_PAGE,
          pageNum: queryParams.page,
          searchQuery: queryParams.searchQuery,
          sortBy: queryParams.sortBy,
          sortDirection: "DESC"
        });

        if (themes.length < THEMES_PER_PAGE) {
          setNoMoreThemes(true);
        } else {
          setNoMoreThemes(false);
        }

        setAllThemes(prev => 
          queryParams.page === 1 ? themes : [...prev, ...themes]
        );
      } catch (err) {
        console.error('Failed to fetch themes:', err);
      }
    };

    loadThemes();
  }, [queryParams, fetchThemes]);

  const handleScroll = useCallback(() => {
    const isNearBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;

    if (!isNearBottom || isLoading || noMoreThemes) {
      return;
    }

    setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadFocusedTheme = async () => {
      const focusedThemeId = searchParams.get("themeId") || "";
      if (focusedThemeId) {
        const theme = await fetchThemesFromApi(`${Endpoints.fetchApiThemes}/${encodeURIComponent(focusedThemeId)}`);
        setFocusedTheme(theme[0]);
      }
    }
    loadFocusedTheme();
  }, [searchParams])

  // Handlers
  const handleSearch = (query: string) => {
    if (query === "") {
      searchParams.delete("searchQuery");
    } else {
      searchParams.set("searchQuery", query);
    }
    setSearchParams(searchParams);
    setQueryParams({ page: 1, sortBy: queryParams.sortBy, searchQuery: query });
    setNoMoreThemes(false);
    setAllThemes([]);
  };

  const handleSortChange = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      sortBy: field,
    }));
    localStorage.setItem("RCBG_THEME_SORT_BY", field);
    setNoMoreThemes(false);
    setAllThemes([]);
  };

  const onPreview = (theme: Theme) => {
    if (previewIds.length === 0) {
      notify("Open the preview panel on the top right corner to preview selected themes!");
    }
    setPreviewIds((prev) =>
      prev.includes(theme.id)
        ? prev.filter((item) => item !== theme.id)
        : [...prev, theme.id]
    );
  };

  if (error) {
    setPromptError("error_modal.fail_themes_fetch");
    return;
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "background.default",
      }}
    >
      {/* Main Content Section */}
      <Box sx={{ flex: 1, padding: 4 }}>
        <Box 
          sx={{
            mt: { xs: 5, sm: 5, md: 5, lg: 0, xl: 0 },
            mb: 4,
          }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary" mb={3}>
            {t("themes.header")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("themes.description")}
          </Typography>
          <GalleryTooltip
            content={t("theme_tooltip.multiple_themes_usage")}
            placement="right"
          >
            <Box display="inline-flex" alignItems="center" color="primary.main">
              <Typography variant="body2" sx={{ marginRight: "4px" }}>
                {t("themes.how_multiple_themes_work")}
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
        </Box>
        {/* Themes Grid */}
        <Grid container spacing={2}>
          {isLoading && queryParams.page === 1 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
              width="300%"
            >
              <CircularProgress size={80} />
            </Box>
          ) : (
            <>
              {allThemes.map((theme) => (
                <Grid
                  item
                  key={theme.id}
                  sm={12}
                  md={6}
                  lg={isPreviewVisible ? 4 : 3}
                >
                  <ThemeCard
                    theme={theme}
                    isPreviewed={previewIds.includes(theme.id)}
                    onPreview={onPreview}
                    onViewMoreInfo={() => {
                      setSearchParams(params => {
                        params.set("themeId", theme.id);
                        return params;
                      });
                      setFocusedTheme(theme)
                    }}
                    updateFavorites={updateFavorites}
                  />
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
          position: isDesktop ? "sticky" : "fixed",
          top: 0,
          right: isDesktop ? "auto": 0,
          mt: isDesktop ? -72 : 0,
          height: "100vh",
          borderLeft: "2px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          transition: "width 0.3s ease",
          zIndex: 1000,
          width: isPreviewVisible ? (isDesktop ? "30%" : "100%") : (isDesktop ? "40px": "0px"),
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Badge
            badgeContent={previewIds.length}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: "primary.main",
                borderRadius: '50%',
                height: '1.5rem',
                minWidth: '1.5rem',
                fontSize: '0.75rem',
                mt: 11,
                mr: "110px",
              },
            }}
          >
            <Button
              onClick={() => setIsPreviewVisible(prev => {
                localStorage.setItem("RCBG_THEME_PREVIEW_VISIBLE", String(!prev));
                return !prev;
              })}
              sx={{
                position: "absolute",
                mt: 11,
                left: isDesktop ? "-110px" : (isPreviewVisible ? "-20px" : "-130px"),
                backgroundColor: "background.secondaryBtn",
                color: "text.primary",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "8px 12px",
                width: 140,
                "&:hover": {
                  backgroundColor: "background.secondaryBtnHover",
                },
              }}
            >
              {isPreviewVisible
                ? `${t("themes.close_theme_preview")} >>`
                : `<< ${t("themes.open_theme_preview")}`}
            </Button>
          </Badge>

          {isPreviewVisible && (
            <Box sx={{ mt: "56px", height: "calc(100% - 56px)" }}>
              <ThemePreview setPreviewIds={setPreviewIds} previewIds={previewIds} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal */}
      {focusedTheme !== null &&
        <ThemeModal
          onClose={() => {
            searchParams.delete("themeId");
            setSearchParams(searchParams);
            setFocusedTheme(null)
          }}
          theme={focusedTheme as Theme}
          updateFavorites={updateFavorites}
        />
      }
    </Box>
  );
};

export default Themes;
