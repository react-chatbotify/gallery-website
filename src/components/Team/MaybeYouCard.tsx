import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Endpoints } from '@/constants/Endpoints';
import useIsDesktop from '@/hooks/useIsDesktop';

/**
 * Props for the MaybeYouCard component.
 */
interface MaybeYouCardProps {
  /**
   * The title text for the card.
   */
  title: string;
  /**
   * The descriptive text for the card.
   */
  text: string;
}

/**
 * Card component serving as a call to action for users to contribute.
 * Styles align with TeamMemberCard for consistent layout.
 */
const MaybeYouCard: React.FC<MaybeYouCardProps> = ({ title, text }) => {
  const { t } = useTranslation('components/team');
  const isDesktop = useIsDesktop();

  // Match heights to TeamMemberCard
  const cardHeight = isDesktop ? 420 : 380;

  return (
    <Card
      sx={{
        border: '2px dashed',
        borderColor: 'primary.main',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        height: cardHeight,
        p: 2,
        width: isDesktop ? '100%' : '85vw',
        justifyContent: 'space-between',
        // Center horizontally on mobile
        mx: isDesktop ? undefined : 'auto',
      }}
    >
      <CardContent
        sx={{
          textAlign: 'center',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <AddCircleOutlineIcon sx={{ fontSize: isDesktop ? 60 : 50, color: 'primary.main' }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {t(title, title)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t(text, text)}
        </Typography>
      </CardContent>

      <Box sx={{ px: 1, pb: 1, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          href={Endpoints.projectCoreDiscordUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 4,
            py: 1,
            mb: 5,
          }}
        >
          {t('maybe_you_card.reach_out_button', 'Reach Out')}
        </Button>
      </Box>
    </Card>
  );
};

export default MaybeYouCard;
