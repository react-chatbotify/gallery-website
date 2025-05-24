import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import { Endpoints } from '@/constants/Endpoints';
import { useAuth } from '@/context/AuthContext';
import useIsDesktop from '@/hooks/useIsDesktop';
import { useNotify } from '@/hooks/useNotify';
import { handleLogin } from '@/services/authService';
import { resetPluginsCache } from '@/services/plugins/cacheService';
import { resetThemesCache } from '@/services/themes/cacheService';
import { galleryApiFetch } from '@/utils';

/**
 * Contains commonly accessed items pinned at the top.
 *
 * @param toggleTheme toggles the theme of the website (light/dark)
 */
const NavigationBar: React.FC<{
  toggleTheme: () => void;
}> = ({ toggleTheme }) => {
  // lazy loads translations
  const { t, i18n } = useTranslation('components/navigationbar');

  const isDesktop = useIsDesktop();
  const { isLoggedIn, setIsLoggedIn, setUserData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityMenuAnchor, setCommunityMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUserData(null);
    await galleryApiFetch(Endpoints.logoutUser);
    resetPluginsCache();
    resetThemesCache();
    localStorage.setItem('logoutMessage', 'You have been logged out successfully, see you next time!');
    if (location.pathname === '/profile') {
      navigate('/');
    }
    window.location.reload();
  };

  const changeLanguage = (lang: string) => {
    localStorage.setItem('RCBG_SELECTED_LANGUAGE', lang);
    i18n.changeLanguage(lang);
    notify(t('navigation_bar.language_updated_message'));
  };

  const generalNavLinkSx = {
    ':hover': {
      backgroundColor: 'transparent',
      color: 'text.primary', // Disable background on hover
    },
    color: 'text.muted',
    textTransform: 'capitalize',
  };

  return (
    <Box
      component="nav"
      sx={{
        alignItems: 'center',
        backdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'space-between',
        left: 0,
        position: isDesktop ? 'sticky' : 'fixed',
        px: 6,
        py: 2,
        top: 0,
        transition: 'background-color 0.3s, opacity 0.3s',
        width: '100%',
        zIndex: 9000,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ alignItems: 'center', display: 'grid' }}>
        <Box component="img" src={logo} alt="Logo" sx={{ height: 32, mx: 2, width: 32 }} />
      </Link>

      {/* Desktop Menu */}
      <Box
        sx={{
          alignItems: 'center',
          display: { md: 'flex', xs: 'none' },
          flexGrow: 1,
          gap: 2,
        }}
      >
        <Button component="a" href={Endpoints.projectBaseUrl} target="_blank" sx={generalNavLinkSx}>
          {t('navigation_bar.documentation')}
        </Button>
        <Button component={Link} to="/plugins" sx={generalNavLinkSx}>
          {t('navigation_bar.plugins')}
        </Button>
        <Button component={Link} to="/themes" sx={generalNavLinkSx}>
          {t('navigation_bar.themes')}
        </Button>
        <Button component={Link} to="/theme-builder" sx={generalNavLinkSx}>
          {t('navigation_bar.theme_builder')}
        </Button>
      </Box>

      {/* Login/Logout and Toggle Buttons */}
      <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
        {/* Community Dropdown */}
        <Box>
          <Button
            onClick={(event) => {
              if (communityMenuAnchor) {
                setCommunityMenuAnchor(null);
              } else {
                setCommunityMenuAnchor(event.currentTarget);
              }
            }}
            sx={generalNavLinkSx}
          >
            {t('navigation_bar.community')}
          </Button>
          <Menu
            anchorEl={communityMenuAnchor}
            open={Boolean(communityMenuAnchor)}
            onClose={() => setCommunityMenuAnchor(null)}
            sx={{ mt: 1, zIndex: 9001 }}
          >
            <MenuItem
              onClick={() => {
                window.open(Endpoints.projectRepoUrl);
                setCommunityMenuAnchor(null);
              }}
            >
              {t('navigation_bar.community.github')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.open(Endpoints.projectDiscordUrl);
                setCommunityMenuAnchor(null);
              }}
            >
              {t('navigation_bar.community.discord')}
            </MenuItem>
          </Menu>
        </Box>
        {isLoggedIn ? (
          <>
            <Button
              component={Link}
              to="/profile"
              sx={{ color: 'text.primary', display: { md: 'block', xs: 'none' }, textTransform: 'capitalize' }}
            >
              {t('navigation_bar.profile')}
            </Button>
            <Button
              onClick={handleLogout}
              sx={{ color: 'text.primary', display: { md: 'block', xs: 'none' }, textTransform: 'capitalize' }}
            >
              {t('navigation_bar.logout')}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleLogin()}
            sx={{
              backgroundColor: 'background.secondary',
              borderRadius: '12px',
              color: 'text.primary',
              display: { md: 'block', xs: 'none' },
              textTransform: 'capitalize',
            }}
          >
            {t('navigation_bar.login')}
          </Button>
        )}

        {/* Language Dropdown */}
        <Box>
          <IconButton
            onClick={(event) => {
              if (languageMenuAnchor) {
                setLanguageMenuAnchor(null);
              } else {
                setLanguageMenuAnchor(event.currentTarget);
              }
            }}
            sx={{ color: 'text.primary' }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageMenuAnchor}
            open={Boolean(languageMenuAnchor)}
            onClose={() => setLanguageMenuAnchor(null)}
            sx={{ mt: 1, zIndex: 9001 }}
          >
            <MenuItem
              onClick={() => {
                changeLanguage('en');
                setLanguageMenuAnchor(null);
              }}
            >
              English
            </MenuItem>
            <MenuItem
              onClick={() => {
                changeLanguage('zh');
                setLanguageMenuAnchor(null);
              }}
            >
              中文
            </MenuItem>
          </Menu>
        </Box>

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
          {theme.palette.mode === 'dark' ? <NightlightIcon /> : <WbSunnyIcon />}
        </IconButton>

        {/* Hamburger Menu for Mobile */}
        <IconButton
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          sx={{ color: 'text.primary', display: { md: 'none', xs: 'block' } }}
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
          '& .MuiDrawer-paper': {
            backgroundColor: 'background.default',
            marginTop: 9,
            maxWidth: '300px',
            width: '60vw',
          },
        }}
      >
        <List>
          {/* Documentation */}
          <ListItem
            component={Link}
            to={Endpoints.projectBaseUrl}
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText primary={t('navigation_bar.documentation')} />
          </ListItem>

          {/* Plugins */}
          <ListItem
            component={Link} // Specify Link as the component
            to="/plugins" // Pass the 'to' prop
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText primary={t('navigation_bar.plugins')} />
          </ListItem>

          {/* Themes */}
          <ListItem component={Link} to="/themes" onClick={() => setMobileMenuOpen(false)} sx={{ cursor: 'pointer' }}>
            <ListItemText primary={t('navigation_bar.themes')} />
          </ListItem>

          {/* Theme Builder */}
          <ListItem
            component={Link}
            to="/theme-builder"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText primary={t('navigation_bar.theme_builder')} />
          </ListItem>

          {/* GitHub */}
          <ListItem
            component="a"
            href={Endpoints.projectRepoUrl}
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText primary={t('navigation_bar.community.github')} />
          </ListItem>

          {/* Discord */}
          <ListItem
            component="a"
            href={Endpoints.projectDiscordUrl}
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText primary={t('navigation_bar.community.discord')} />
          </ListItem>

          {isLoggedIn ? (
            <>
              <ListItem
                component={Link}
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText primary={t('navigation_bar.profile')} />
              </ListItem>
              <ListItem onClick={handleLogout} sx={{ cursor: 'pointer' }}>
                <ListItemText primary={t('navigation_bar.logout')} />
              </ListItem>
            </>
          ) : (
            <ListItem onClick={() => handleLogin()} sx={{ cursor: 'pointer' }}>
              <ListItemText primary={t('navigation_bar.login')} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default NavigationBar;
