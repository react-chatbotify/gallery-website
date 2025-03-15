import InfoIcon from "@mui/icons-material/Info";
import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import GalleryTooltip from "@/components/GalleryTooltip/GalleryTooltip";
import PluginCard from "@/components/Plugins/PluginCard";
import PluginModal from "@/components/Plugins/PluginModal";
import SearchBar from "@/components/SearchBar/SearchBar";
import SortButton from "@/components/SearchBar/SortButton";
import { useAuth } from "@/context/AuthContext";
import { useGlobalModal } from "@/context/GlobalModalContext";
import useActionQueue from "@/hooks/useActionQueue";
import { useNotify } from "@/hooks/useNotify";
import { Plugin } from "@/interfaces/Plugin";
import { addPluginToFavorites, fetchPluginsFromApi, removePluginFromFavorites } from "@/services/plugins/apiService";
import { useTranslation } from "react-i18next";
import { Endpoints } from "../constants/Endpoints";
import useFetchPlugins from "../hooks/useFetchPlugins";

const PLUGINS_PER_PAGE = import.meta.env.VITE_PLUGINS_PER_PAGE;

/**
 * Shows available plugins for users to browse.
 */
const Plugins: React.FC = () => {
  // lazy load translations
  const { t } = useTranslation("pages/plugins");
  const { isLoggedIn } = useAuth();
  const { setPromptLogin, setPromptError } = useGlobalModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchPlugins, isLoading, error } = useFetchPlugins();
  const notify = useNotify();
  
  const [queryParams, setQueryParams] = useState({
    page: 1,
    sortBy: localStorage.getItem("RCBG_THEME_SORT_BY") ?? "updatedAt",
    searchQuery: searchParams.get("searchQuery") || "",
  });
  
  const [focusedPlugin, setFocusedPlugin] = useState<null | Plugin>(null);
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
      notify("Plugin added to favorites!");
      addQueue(plugin);
    } else {
      notify("Plugin removed from favorites!");
      removeQueue(plugin);
    }
    setAllPlugins(prev =>
      prev.map(e =>
        e.id === plugin.id
          ? {
            ...e,
            isFavorite: isFavoriting,
            favoritesCount: isFavoriting ? e.favoritesCount + 1 : e.favoritesCount - 1,
          }
          : e
      )
    );
    setFocusedPlugin(prev => {
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

  // Fetch plugins when query params change
  useEffect(() => {
    const loadPlugins = async () => {
      try {
        const plugins = await fetchPlugins({
          url: Endpoints.fetchApiPlugins,
          pageSize: PLUGINS_PER_PAGE,
          pageNum: queryParams.page,
          searchQuery: queryParams.searchQuery,
          sortBy: queryParams.sortBy,
          sortDirection: "DESC"
        });

        if (plugins.length < PLUGINS_PER_PAGE) {
          setNoMorePlugins(true);
        } else {
          setNoMorePlugins(false);
        }

        setAllPlugins(prev => 
          queryParams.page === 1 ? plugins : [...prev, ...plugins]
        );
      } catch (err) {
        console.error('Failed to fetch plugins:', err);
      }
    };

    loadPlugins();
  }, [queryParams, fetchPlugins]);

  const handleScroll = useCallback(() => {
    const isNearBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;

    if (!isNearBottom || isLoading || noMorePlugins) {
      return;
    }

    setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadFocusedPlugin = async () => {
      const focusedPluginId = searchParams.get("pluginId") || "";
      if (focusedPluginId) {
        const plugin = await fetchPluginsFromApi(`${Endpoints.fetchApiPlugins}/${encodeURIComponent(focusedPluginId)}`);
        setFocusedPlugin(plugin[0]);
      }
    }
    loadFocusedPlugin();
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
    setNoMorePlugins(false);
    setAllPlugins([]);
  };

  const handleSortChange = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      page: 1,
      sortBy: field,
    }));
    localStorage.setItem("RCBG_THEME_SORT_BY", field);
    setNoMorePlugins(false);
    setAllPlugins([]);
  };

  if (error) {
    setPromptError("error_modal.fail_plugins_fetch");
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
            {t("plugins.header")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("plugins.description")}
          </Typography>
          <GalleryTooltip
            content={t("plugin_tooltip.plugin_usage")}
            placement="right"
          >
            <Box display="inline-flex" alignItems="center" color="primary.main">
              <Typography variant="body2" sx={{ marginRight: "4px" }}>
                {t("plugins.how_plugins_work")}
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
        {/* Plugins Grid */}
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
              {allPlugins.map((plugin) => (
                <Grid
                  item
                  key={plugin.id}
                  sm={12}
                  md={6}
                  lg={3}
                >
                  <PluginCard
                    plugin={plugin}
                    onViewMoreInfo={() => {
                      setSearchParams(params => {
                        params.set("pluginId", plugin.id);
                        return params;
                      });
                      setFocusedPlugin(plugin)
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

      {/* Modal */}
      {focusedPlugin !== null &&
        <PluginModal
          onClose={() => {
            searchParams.delete("pluginId");
            setSearchParams(searchParams);
            setFocusedPlugin(null)
          }}
          plugin={focusedPlugin as Plugin}
          updateFavorites={updateFavorites}
        />
      }
    </Box>
  );
};

export default Plugins;
