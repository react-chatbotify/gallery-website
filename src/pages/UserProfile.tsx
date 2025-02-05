import { useGlobalModal } from "@/context/GlobalModalContext";
import useFetchPlugins from "@/hooks/useFetchPlugins";
import { Plugin } from "@/interfaces/Plugin";
import { Theme } from "@/interfaces/Theme";
import { galleryApiFetch } from "@/utils";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserProfileInfoSection from "../components/UserProfile/UserProfileInfoSection";
import UserProfilePluginSection from "../components/UserProfile/UserProfilePluginSection";
import UserProfileThemeSection from "../components/UserProfile/UserProfileThemeSection";
import { Endpoints } from "../constants/Endpoints";
import { useAuth } from "../context/AuthContext";
import useFetchThemes from "../hooks/useFetchThemes";

const THEME_FAVORITES_PER_PAGE = import.meta.env.VITE_THEME_FAVORITES_PER_PAGE;
const THEME_OWNERSHIP_PER_PAGE = import.meta.env.VITE_THEME_OWNERSHIP_PER_PAGE;
const PLUGIN_FAVORITES_PER_PAGE = import.meta.env.VITE_PLUGIN_FAVORITES_PER_PAGE;
const PLUGIN_OWNERSHIP_PER_PAGE = import.meta.env.VITE_PLUGIN_OWNERSHIP_PER_PAGE;

/**
 * Displays user profile information, owned themes/plugins, and favorited themes/plugins.
 */
const UserProfilePage: React.FC = () => {
  const { userData, setUserData } = useAuth();
  const { setPromptError } = useGlobalModal();

  const { fetchThemes, isLoading: isLoadingThemes } = useFetchThemes();
  const [selectedThemeType, setSelectedThemeType] = useState<"personal" | "favorite">("favorite");
  const [themes, setThemes] = useState<Theme[]>([]);

  const { fetchPlugins, isLoading: isLoadingPlugins } = useFetchPlugins();
  const [selectedPluginType, setSelectedPluginType] = useState<"personal" | "favorite">("favorite");
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  // Fetch user data on mount
  useEffect(() => {
    refreshUserData();
  }, []);

  // Fetch themes when theme type changes
  useEffect(() => {
    const loadThemes = async () => {
      try {
        const fetchedThemes = await fetchThemes({
          url: selectedThemeType === "personal" 
            ? Endpoints.fetchUserOwnedThemes 
            : Endpoints.favoriteThemes,
          pageSize: selectedThemeType === "personal" 
            ? THEME_OWNERSHIP_PER_PAGE 
            : THEME_FAVORITES_PER_PAGE,
          pageNum: 1,
          sortBy: "updatedAt",
          sortDirection: "DESC"
        });
        
        setThemes(fetchedThemes);
      } catch (err) {
        console.error("Failed to fetch themes:", err);
      }
    };

    loadThemes();
  }, [selectedThemeType, fetchThemes]);

  useEffect(() => {
    const loadPlugins = async () => {
      try {
        const fetchedPlugins = await fetchPlugins({
          url: selectedPluginType === "personal" 
            ? Endpoints.fetchUserOwnedPlugins
            : Endpoints.favoritePlugins,
          pageSize: selectedPluginType === "personal" 
            ? PLUGIN_OWNERSHIP_PER_PAGE 
            : PLUGIN_FAVORITES_PER_PAGE,
          pageNum: 1,
          sortBy: "updatedAt",
          sortDirection: "DESC"
        });
        
        setPlugins(fetchedPlugins);
      } catch (err) {
        console.error("Failed to fetch plugins:", err);
      }
    };

    loadPlugins();
  }, [selectedPluginType, fetchPlugins]);

  const refreshUserData = async () => {
    try {
      const response = await galleryApiFetch(Endpoints.fetchUserProfile);
      if (response.ok) {
        const result = await response.json();
        setUserData(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      // todo: send to error page
    }
  };

  // Handle theme type toggle
  const handleThemeTypeToggle = (type: "personal" | "favorite") => {
    setSelectedThemeType(type);
  };

  const handlePluginTypeToggle  = (type: "personal" | "favorite") => {
    setSelectedPluginType(type);
  };

  if (!userData) {
    setPromptError("error_modal.fail_user_data_fetch");
    return;
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        color: "text.primary",
        marginBottom: 5,
      }}
    >
      <UserProfileInfoSection userData={userData} />

      <UserProfileThemeSection
        themes={themes}
        isLoading={isLoadingThemes}
        selectedThemeType={selectedThemeType}
        onToggleThemeType={handleThemeTypeToggle}
      />

      {/* Plugins section commented out for now */}
      <UserProfilePluginSection
        plugins={plugins}
        isLoading={isLoadingPlugins}
        selectedPluginType={selectedPluginType}
        onTogglePluginType={handlePluginTypeToggle}
      />
    </Box>
  );
};

export default UserProfilePage;