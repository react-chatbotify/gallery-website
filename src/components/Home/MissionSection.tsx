import { Box, Typography } from '@mui/material';
import { Goal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Briefly shares on the mission of the project.
 */
const MissionSection = () => {
  // lazy loads translations
  const { t } = useTranslation('components/home');

  return (
    <Box
      component="section"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        textAlign: 'center',
      }}
    >
      {/* Icon */}
      <Goal
        style={{
          color: 'secondary.main',
          fontSize: '3rem',
        }}
      />
      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
        }}
      >
        {t('mission_section.title')}
      </Typography>
      {/* Paragraph */}
      <Typography
        sx={{
          fontSize: { lg: '1.125rem', xs: '1rem' },
          lineHeight: 1.6,
          maxWidth: 650,
        }}
      >
        <Box component="span" display="block" sx={{ marginBottom: 2 }}>
          {t('mission_section.body_text.1')}
        </Box>
        <Box component="span" display="block">
          {t('mission_section.body_text.2')}
        </Box>
      </Typography>
    </Box>
  );
};

export default MissionSection;
