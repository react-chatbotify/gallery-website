import { Endpoints } from '@/constants/Endpoints';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HeroImg from '../../assets/images/About/Hero-img.png';

/**
 * Shows a broad overview of the chatbot when user lands on the home page.
 */
const HeroSection = () => {
  // lazy loads translations
  const { t } = useTranslation("components/home");

  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        justifyContent: { xs: 'center', lg: 'space-between' },
        alignItems: 'center',
        pt: 8,
        gap: 3,
      }}
    >
      {/* Left Text Section */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: 'center', lg: 'left' },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', lg: '3rem' },
          }}
        >
          {t("hero_section.title")}
        </Typography>
        <Typography
          sx={{
            mt: 3,
            maxWidth: '500px',
            mx: { xs: 'auto', lg: 'unset' },
            fontSize: { xs: '1rem', lg: '1.125rem' },
          }}
        >
          <Box component="span" display="block">
            {t("hero_section.body_text.1")}
            <Link
              to={Endpoints.projectNpmUrl}
              style={{
                color: 'secondary.main',
                textDecoration: 'none',
              }}
              target="_blank"
            >
              {t("hero_section.body_text.2")}
            </Link>.
          </Box>
          <Box component="span" display="block" mt={2}>
            {t("hero_section.body_text.3")}
          </Box>
        </Typography>
      </Box>

      {/* Right Image Section */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          justifyContent: { xs: 'center', lg: 'flex-end' },
        }}
      >
        {/* Main Image */}
        <Box
          component="img"
          src={HeroImg}
          sx={{
            width: '75%',
            maxWidth: '500px',
            aspectRatio: '1',
            position: 'relative',
            zIndex: 10,
          }}
        />
        {/* Background Gradient */}
        <Box
          sx={{
            position: 'absolute',
            width: '55%',
            height: '55%',
            bgcolor: 'transparent',
            background: `linear-gradient(to right, ${theme.palette.secondary[900]},
              ${theme.palette.primary[500]})`,
            transform: 'rotate(-45deg)',
            borderRadius: '50%',
            top: '55%',
            left: '60%',
            zIndex: 0,
            filter: 'blur(200px)',
            transformOrigin: 'center',
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
