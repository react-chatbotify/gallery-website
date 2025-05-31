import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    accent: {
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#C8D5E1',
      400: '#94A3B8',
      50: '#F8FAFC',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },

    background: {
      default: '#121212',
      muted: '#27272A',
      paper: '#09090B',
      primaryBtn: '#D1D5DB',
      primaryBtnHover: '#BFC5CE',
      secondary: '#404040',
      secondaryBtn: '#374151',
      secondaryBtnHover: '#425065',
    },

    grey: {
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#303030',
      900: '#27272A',
    },
    // standard colors, consistent across themes
    mode: 'dark',
    primary: {
      100: '#C2EDF2',
      200: '#9CE1EA',
      300: '#75D5E1',
      400: '#58C9D8',
      50: '#E6F8FA',
      500: '#42B0C5',
      600: '#3593A1',
      700: '#29757C',
      800: '#1E5757',
      900: '#143838',
      main: '#3B82F6',
    },

    secondary: {
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      50: '#F5F3FF',
      500: '#8B5CF6',
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
      main: '#64748B',
    },
    // theme specific colors
    text: {
      disabled: '#5D5C5C',
      muted: '#A1A1AA',
      primary: '#FAFAFA',
      primaryBtn: '#0F172A',
      primaryBtnHover: '#1E293B',
      secondary: '#A1A1AA',
      secondaryBtn: '#FAFAFA',
      secondaryBtnHover: '#D1D5DB',
    },
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
			"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
  },
});

export default darkTheme;
