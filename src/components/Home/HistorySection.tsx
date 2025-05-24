import { Box, Typography } from '@mui/material';
import { Hourglass } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Briefly shares about the history of the project.
 */
const HistorySection = () => {
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
      <Hourglass
        style={{
          color: 'secondary.main',
          fontSize: '3rem',
          transform: 'rotate(12deg)',
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
        {t('history_section.title')}
      </Typography>
      {/* Paragraph */}
      <Typography
        sx={{
          fontSize: { lg: '1.125rem', xs: '1rem' },
          maxWidth: 650,
        }}
      >
        {t('history_section.body_text')}
      </Typography>
    </Box>
  );
};

export default HistorySection;
