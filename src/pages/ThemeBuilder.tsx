import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Interactive builder for users to craft and publish themes directly through the website.
 */
const ThemeBuilder: React.FC = () => {
  // lazy load translations
  const { t } = useTranslation("/pages/themebuilder");

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: 'background.default',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'background.paper',
          padding: 5,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
          width: '80vw'
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            color: 'text.primary',
          }}
        >
          {t("theme_builder.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 4,
            color: 'text.secondary',
          }}
        >
          {t("theme_builder.paragraph.1")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 4,
            color: 'text.disabled',
          }}
        >
          {t("theme_builder.paragraph.2")}
        </Typography>
        <Button
          component={Link}
          to="/themes"
          variant="contained"
          sx={{
            bgcolor: "background.primaryBtn",
            color: "text.primaryBtn",
            paddingX: 4,
            paddingY: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            ':hover': {
              backgroundColor: 'background.primaryBtnHover',
            },
          }}
        >
          {t("theme_builder.browse_themes")}
        </Button>
      </Container>
    </Box>
  );
};

export default ThemeBuilder;
