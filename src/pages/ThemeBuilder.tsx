import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Interactive builder for users to craft and publish themes directly through the website.
 */
const ThemeBuilder: React.FC = () => {
  // lazy load translations
  const { t } = useTranslation('/pages/themebuilder');

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.default',
        display: 'flex',
        height: '80vh',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          padding: 5,
          textAlign: 'center',
          width: '80vw',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            marginBottom: 2,
          }}
        >
          {t('theme_builder.title')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            marginBottom: 4,
          }}
        >
          {t('theme_builder.paragraph.1')}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.disabled',
            marginBottom: 4,
          }}
        >
          {t('theme_builder.paragraph.2')}
        </Typography>
        <Button
          component={Link}
          to="/themes"
          variant="contained"
          sx={{
            ':hover': {
              backgroundColor: 'background.primaryBtnHover',
            },
            bgcolor: 'background.primaryBtn',
            borderRadius: 2,
            color: 'text.primaryBtn',
            fontSize: '1rem',
            fontWeight: 500,
            paddingX: 4,
            paddingY: 1,
            textTransform: 'none',
          }}
        >
          {t('theme_builder.browse_themes')}
        </Button>
      </Container>
    </Box>
  );
};

export default ThemeBuilder;
