import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
// import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import ExtensionIcon from '@mui/icons-material/Extension';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import PaletteIcon from '@mui/icons-material/Palette';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaBookOpen,
  FaDiscord,
  FaDoorOpen,
  FaInstagram,
  FaTwitter,
  FaUserCog,
  FaUserFriends,
  FaUserSecret,
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logo.webp';
import { Endpoints } from '@/constants/Endpoints';
import { useAuth } from '@/context/AuthContext';
import useIsDesktop from '@/hooks/useIsDesktop';
import { useNotify } from '@/hooks/useNotify';
import { handleLogin } from '@/services/authService';
import { resetPluginsCache } from '@/services/plugins/cacheService';
import { resetThemesCache } from '@/services/themes/cacheService';
import { galleryApiFetch } from '@/utils';

/**
 * NavigationBar component renders a responsive top navigation bar with:
 * - Logo linking to home
 * - Documentation, plugins, themes and theme-builder links
 * - Community menu, GitHub link, language selector and theme toggle
 * - Login/logout and user menu handling
 * - Mobile drawer with equivalent navigation and utility actions
 *
 * @param toggleTheme function to switch between light and dark modes
 */
const NavigationBar: React.FC<{
  toggleTheme: () => void;
}> = ({ toggleTheme }) => {
  // initialize translation for this component namespace
  const { t, i18n } = useTranslation('components/navigationbar');

  const isDesktop = useIsDesktop();
  const { isLoggedIn, setIsLoggedIn, setUserData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotify();

  // anchors for various dropdown menus
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [communityMenuAnchor, setCommunityMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [aboutMenuAnchor, setAboutMenuAnchor] = useState<null | HTMLElement>(null);

  // mobile drawer open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = useTheme();

  // close mobile drawer whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  /**
   * Logs the user out by clearing auth state, invalidating caches,
   * notifying the backend, and reloading the page.
   */
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

  /**
   * Changes the application language, updates localStorage,
   * applies to i18n and shows a notification.
   *
   * @param lang locale code to switch to (e.g. 'en', 'zh')
   */
  const changeLanguage = (lang: string) => {
    localStorage.setItem('RCBG_SELECTED_LANGUAGE', lang);
    i18n.changeLanguage(lang).then(() => {
      notify(t('navigation_bar.language_updated_message'));
    });
  };

  // shared style for navigation links
  const generalNavLinkSx = {
    '&:visited': {
      color: 'text.muted',
    },
    ':hover': {
      backgroundColor: 'transparent',
      color: 'text.primary',
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
        px: { sm: 6, xs: 2 },
        py: 2,
        top: 0,
        transition: 'background-color 0.3s, opacity 0.3s',
        width: '100%',
        zIndex: 9000,
      }}
    >
      {/* Logo linking to home */}
      <Link to="/" style={{ alignItems: 'center', display: 'grid' }}>
        <Box component="img" src={logo} alt="Logo" sx={{ height: 32, mx: 2, width: 32 }} />
      </Link>

      {/* Desktop navigation links */}
      <Box
        sx={{
          alignItems: 'center',
          display: { md: 'flex', xs: 'none' },
          flexGrow: 1,
          gap: 2,
        }}
      >
        <Button component="a" href={Endpoints.projectQuickStartUrl} target="_blank" sx={generalNavLinkSx}>
          {t('navigation_bar.documentation')}
        </Button>
        <Button component={Link} to="/plugins" sx={generalNavLinkSx}>
          {t('navigation_bar.plugins')}
        </Button>
        <Button component={Link} to="/themes" sx={generalNavLinkSx}>
          {t('navigation_bar.themes')}
        </Button>
        <Box>
          <Button
            onClick={(event) => setAboutMenuAnchor((prev) => (prev ? null : event.currentTarget))}
            sx={generalNavLinkSx}
          >
            {t('navigation_bar.about_us')}
          </Button>
          <Menu
            anchorEl={aboutMenuAnchor}
            open={Boolean(aboutMenuAnchor)}
            onClose={() => setAboutMenuAnchor(null)}
            sx={{ mt: 1, zIndex: 9001 }}
          >
            <MenuItem component="a" href="/teams" onClick={() => setAboutMenuAnchor(null)}>
              <FaUserFriends style={{ marginRight: 8 }} />
              {t('navigation_bar.about_us.our_team')}
            </MenuItem>
            <MenuItem component="a" href="/terms-of-service" onClick={() => setAboutMenuAnchor(null)}>
              <FaBookOpen style={{ marginRight: 8 }} />
              {t('navigation_bar.about_us.terms_of_service')}
            </MenuItem>
            <MenuItem component="a" href="/privacy-policy" onClick={() => setAboutMenuAnchor(null)}>
              <FaUserSecret style={{ marginRight: 8 }} />
              {t('navigation_bar.about_us.privacy_policy')}
            </MenuItem>
          </Menu>
        </Box>
        {/* <Button component={Link} to="/theme-builder" sx={generalNavLinkSx}>
          {t('navigation_bar.theme_builder')}
        </Button> */}
      </Box>

      {/* Authentication, community, language & theme controls */}
      <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
        {/* Community dropdown and GitHub link (desktop only) */}
        <Box sx={{ alignItems: 'center', display: { md: 'flex', xs: 'none' }, gap: 2 }}>
          <Box>
            <Button
              onClick={(event) => setCommunityMenuAnchor((prev) => (prev ? null : event.currentTarget))}
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
                  window.open(Endpoints.projectCoreDiscordUrl);
                  setCommunityMenuAnchor(null);
                }}
              >
                <FaDiscord style={{ marginRight: 8 }} />
                {t('navigation_bar.community.discord')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open(Endpoints.instagramCoreUrl);
                  setCommunityMenuAnchor(null);
                }}
              >
                <FaInstagram style={{ marginRight: 8 }} />
                {t('navigation_bar.community.instagram')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.open(Endpoints.twitterCoreUrl);
                  setCommunityMenuAnchor(null);
                }}
              >
                <FaTwitter style={{ marginRight: 8 }} />
                {t('navigation_bar.community.twitter')}
              </MenuItem>
            </Menu>
          </Box>

          {/* Direct link to GitHub repository */}
          <IconButton component="a" href={Endpoints.projectCoreRepoUrl} target="_blank">
            <GitHubIcon sx={{ fill: theme.palette.mode === 'dark' ? '#fff' : '#000' }} />
          </IconButton>

          {isLoggedIn ? (
            <>
              {/* User menu when logged in */}
              <IconButton
                onClick={(event) => setUserMenuAnchor((prev) => (prev ? null : event.currentTarget))}
                sx={{ color: 'text.primary' }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={() => setUserMenuAnchor(null)}
                sx={{ mt: 1, zIndex: 9001 }}
              >
                <MenuItem component="a" href="/profile" onClick={() => setUserMenuAnchor(null)}>
                  <FaUserCog style={{ marginRight: 8 }} />
                  {t('navigation_bar.profile')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    setUserMenuAnchor(null);
                  }}
                >
                  <FaDoorOpen style={{ marginRight: 8 }} />
                  {t('navigation_bar.logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            // Login button when not authenticated
            <Button
              onClick={handleLogin}
              sx={{
                backgroundColor: 'background.secondary',
                borderRadius: '9999px',
                color: 'text.primary',
                display: { md: 'block', xs: 'none' },
                px: 3,
                py: 0.5,
                textTransform: 'capitalize',
              }}
            >
              {t('navigation_bar.login')}
            </Button>
          )}

          {/* Language selector dropdown */}
          <Box>
            <IconButton
              onClick={(event) => setLanguageMenuAnchor((prev) => (prev ? null : event.currentTarget))}
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
                🇺🇸 English
              </MenuItem>
              <MenuItem
                onClick={() => {
                  changeLanguage('zh');
                  setLanguageMenuAnchor(null);
                }}
              >
                🇨🇳 中文
              </MenuItem>
            </Menu>
          </Box>

          {/* Theme toggle button */}
          <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
            {theme.palette.mode === 'dark' ? <NightlightIcon /> : <WbSunnyIcon />}
          </IconButton>
        </Box>

        {/* Hamburger menu icon for mobile view */}
        <IconButton
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          sx={{ color: 'text.primary', display: { md: 'none', xs: 'block' } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile navigation drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: 0,
            height: '100%',
            marginTop: 0,
            maxWidth: '100%',
            width: '100%',
          },
          zIndex: 9001,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
          {/* Drawer header with logo and close button */}
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
              px: 2,
              py: 0.5,
            }}
          >
            <Link to="/" style={{ alignItems: 'center', display: 'grid' }}>
              <Box component="img" src={logo} alt="Logo" sx={{ height: 32, width: 32 }} />
            </Link>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Primary navigation links in drawer */}
          <List>
            <ListItem component="a" href={Endpoints.projectQuickStartUrl} sx={generalNavLinkSx}>
              <DescriptionIcon sx={{ mr: 1 }} />
              <ListItemText primary={t('navigation_bar.documentation')} />
            </ListItem>
            <ListItem component={Link} to="/plugins" sx={generalNavLinkSx}>
              <ExtensionIcon sx={{ mr: 1 }} />
              <ListItemText primary={t('navigation_bar.plugins')} />
            </ListItem>
            <ListItem component={Link} to="/themes" sx={generalNavLinkSx}>
              <PaletteIcon sx={{ mr: 1 }} />
              <ListItemText primary={t('navigation_bar.themes')} />
            </ListItem>
            {/* <ListItem component={Link} to="/theme-builder" sx={generalNavLinkSx}>
              <CodeIcon sx={{ mr: 1 }} />
              <ListItemText primary={t('navigation_bar.theme_builder')} />
            </ListItem> */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={(event) => setAboutMenuAnchor((prev) => (prev ? null : event.currentTarget))}
                sx={generalNavLinkSx}
              >
                <InfoIcon sx={{ mr: 1 }} />
                <ListItemText primary={t('navigation_bar.about_us')} />
              </ListItemButton>
            </ListItem>
          </List>

          {/* Mobile community and utility bar */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 'auto' }}>
            {/* Social media icon row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
              <IconButton onClick={() => window.open(Endpoints.projectCoreDiscordUrl)}>
                <FaDiscord />
              </IconButton>
              <IconButton component="a" href={Endpoints.projectCoreRepoUrl} target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton onClick={() => window.open(Endpoints.instagramCoreUrl)}>
                <FaInstagram />
              </IconButton>
              <IconButton onClick={() => window.open(Endpoints.twitterCoreUrl)}>
                <FaTwitter />
              </IconButton>
            </Box>

            {/* Mobile utility: language, theme, and profile */}
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-around',
                mb: 2,
              }}
            >
              {/* Language picker for mobile */}
              <IconButton onClick={(e) => setLanguageMenuAnchor(e.currentTarget)} sx={{ color: 'text.primary' }}>
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
                  🇺🇸 English
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    changeLanguage('zh');
                    setLanguageMenuAnchor(null);
                  }}
                >
                  🇨🇳 中文
                </MenuItem>
              </Menu>

              {/* Theme toggle for mobile */}
              <IconButton onClick={toggleTheme} sx={{ color: 'text.primary' }}>
                {theme.palette.mode === 'dark' ? <NightlightIcon /> : <WbSunnyIcon />}
              </IconButton>

              {/* Profile icon link in mobile when logged in */}
              {isLoggedIn && (
                <IconButton
                  component={Link}
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ color: 'text.primary' }}
                >
                  <AccountCircleIcon />
                </IconButton>
              )}
            </Box>

            {/* Mobile auth button (login/logout) */}
            {isLoggedIn ? (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                sx={{ textTransform: 'capitalize' }}
              >
                {t('navigation_bar.logout')}
              </Button>
            ) : (
              <Button
                fullWidth
                onClick={() => {
                  handleLogin();
                  setMobileMenuOpen(false);
                }}
                sx={{
                  backgroundColor: 'background.muted',
                  borderRadius: '10px',
                  color: 'text.primary',
                  mt: 1,
                  py: 1,
                  textTransform: 'capitalize',
                }}
              >
                {t('navigation_bar.login')}
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavigationBar;
