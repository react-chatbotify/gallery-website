import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from "@mui/icons-material/Menu";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material";
import { useTranslation } from "react-i18next";

import logo from "@/assets/images/logo.png";
import { Endpoints } from "@/constants/Endpoints";
import { useAuth } from "@/context/AuthContext";
import useIsDesktop from "@/hooks/useIsDesktop";
import { useNotify } from "@/hooks/useNotify";
import { handleLogin } from "@/services/authService";
import { resetPluginsCache } from "@/services/plugins/cacheService";
import { resetThemesCache } from "@/services/themes/cacheService";
import { galleryApiFetch } from "@/utils";

/**
 * Contains commonly accessed items pinned at the top.
 *
 * @param isDarkMode boolean indicating if the website is in dark mode
 * @param toggleTheme toggles the theme of the website (light/dark)
 */
const NavigationBar: React.FC<{
  isDarkMode: boolean;
  toggleTheme: () => void
}> = ({
  isDarkMode,
  toggleTheme
}) => {
  // lazy loads translations
  const { t, i18n } = useTranslation("components/navigationbar");

  const isDesktop = useIsDesktop();
  const { isLoggedIn, setIsLoggedIn, setUserData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityMenuAnchor, setCommunityMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    await galleryApiFetch(Endpoints.logoutUser);
    resetPluginsCache();
    resetThemesCache();
    localStorage.setItem("logoutMessage", "You have been logged out successfully, see you next time!");
    if (location.pathname === "/profile") {
      navigate("/");
    }
    window.location.reload();
  };

  const changeLanguage = (lang: string) => {
    localStorage.setItem("RCBG_SELECTED_LANGUAGE", lang);
    i18n.changeLanguage(lang);
    notify(t("navigation_bar.language_updated_message"));
  };

  const generalNavLinkSx = { color: "text.muted", textTransform: "capitalize"  ,  ":hover": { 
    color: "text.primary", 
    backgroundColor: "transparent" // Disable background on hover
  }  }

  return (
    <Box
      component="nav"
      sx={{
        position: isDesktop ? "sticky" : "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9000,
        py: 2,
        px: 6,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "background.navbar",
        transition: "background-color 0.3s, opacity 0.3s",
        backdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{display: "grid", alignItems: "center"}}>
        <Box component="img" src={logo} alt="Logo" sx={{ width: 32, height: 32, mx: 2 }} />
      </Link>

      {/* Desktop Menu */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexGrow: 1,
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          component="a"
          href={Endpoints.projectBaseUrl}
          target="_blank"
          sx={generalNavLinkSx}
        >
          {t("navigation_bar.documentation")}
        </Button>
        <Button component={Link} to="/plugins" sx={generalNavLinkSx}>
          {t("navigation_bar.plugins")}
        </Button>
        <Button component={Link} to="/themes" sx={generalNavLinkSx}>
          {t("navigation_bar.themes")}
        </Button>
        <Button component={Link} to="/theme-builder" sx={generalNavLinkSx}>
          {t("navigation_bar.theme_builder")}
        </Button>
      </Box>

      {/* Login/Logout and Toggle Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Community Dropdown */}
        <Box>
          <Button
            onClick={(event) => {
              if (communityMenuAnchor) {
                setCommunityMenuAnchor(null);
              } else {
                setCommunityMenuAnchor(event.currentTarget)
              }
            }}
            sx={generalNavLinkSx}
          >
            {t("navigation_bar.community")}
          </Button>
          <Menu
            anchorEl={communityMenuAnchor}
            open={Boolean(communityMenuAnchor)}
            onClose={() => setCommunityMenuAnchor(null)}
            sx={{ mt: 1, zIndex: 9001 }}
          >
            <MenuItem onClick={() => {
              window.open(Endpoints.projectRepoUrl);
              setCommunityMenuAnchor(null);
            }}>
              {t("navigation_bar.community.github")}
            </MenuItem>
            <MenuItem onClick={() => {
              window.open(Endpoints.projectDiscordUrl);
              setCommunityMenuAnchor(null);
            }}>
              {t("navigation_bar.community.discord")}
            </MenuItem>
          </Menu>
        </Box>
        {isLoggedIn ? (
          <>
            <Button
              component={Link}
              to="/profile"
              sx={{ color: "text.primary", textTransform: "capitalize", display: { xs: "none", md: "block" } }}
            >
              {t("navigation_bar.profile")}
            </Button>
            <Button
              onClick={handleLogout}
              sx={{ color: "text.primary", textTransform: "capitalize", display: { xs: "none", md: "block" } }}
            >
              {t("navigation_bar.logout")}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleLogin()}
            sx={{ color: "text.primary", textTransform: "capitalize", display: { xs: "none", md: "block" }, backgroundColor: "background.secondary", borderRadius: '12px' }}
          >
            {t("navigation_bar.login")}
          </Button>
        )}

        {/* Language Dropdown */}
        <Box>
          <IconButton
            onClick={(event) => {
              if (languageMenuAnchor) {
                setLanguageMenuAnchor(null);
              } else {
                setLanguageMenuAnchor(event.currentTarget)
              }
            }}
            sx={{ color: "text.primary" }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageMenuAnchor}
            open={Boolean(languageMenuAnchor)}
            onClose={() => setLanguageMenuAnchor(null)}
            sx={{ mt: 1, zIndex: 9001 }}
          >
            <MenuItem onClick={() => {
              changeLanguage("en")
              setLanguageMenuAnchor(null)
            }}>English</MenuItem>
            <MenuItem onClick={() => {
              changeLanguage("zh")
              setLanguageMenuAnchor(null)
            }}>中文</MenuItem>
          </Menu>
        </Box>

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} sx={{ color: "text.primary" }}>
          {isDarkMode ? <NightlightIcon /> : <WbSunnyIcon />}
        </IconButton>

        {/* Hamburger Menu for Mobile */}
        <IconButton
          onClick={() => setMobileMenuOpen(prev => !prev)}
          sx={{ color: "text.primary", display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "60vw",
            maxWidth: "300px",
            backgroundColor: "background.default",
            marginTop: 9,
          },
        }}
      >
        <List>
          {/* Documentation */}
          <ListItem
            component={Link}
            to={Endpoints.projectBaseUrl}
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={t("navigation_bar.documentation")} />
          </ListItem>

          {/* Plugins */}
          <ListItem
            component={Link} // Specify Link as the component
            to="/plugins" // Pass the 'to' prop
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={t("navigation_bar.plugins")} />
          </ListItem>

          {/* Themes */}
          <ListItem
            component={Link}
            to="/themes"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={t("navigation_bar.themes")} />
          </ListItem>

          {/* Theme Builder */}
          <ListItem
            component={Link}
            to="/theme-builder"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={t("navigation_bar.theme_builder")} />
          </ListItem>

          {/* GitHub */}
          <ListItem
            component="a"
            href={Endpoints.projectRepoUrl}
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={t("navigation_bar.community.github")} />
          </ListItem>

          {/* Discord */}
          <ListItem
            component="a"
            href={Endpoints.projectDiscordUrl}
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={t("navigation_bar.community.discord")} />
          </ListItem>

          {isLoggedIn ? (
            <>
              <ListItem
                component={Link}
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary={t("navigation_bar.profile")} />
              </ListItem>
              <ListItem
                onClick={handleLogout}
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary={t("navigation_bar.logout")} />
              </ListItem>
            </>
          ) : (
            <ListItem
              onClick={() => handleLogin()}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText primary={t("navigation_bar.login")} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default NavigationBar;
