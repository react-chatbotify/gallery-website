import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Icon for CTA
import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsDesktop from '@/hooks/useIsDesktop';

/**
 * Props for the MaybeYouCard component.
 */
interface MaybeYouCardProps {
  /**
   * The URL for the call-to-action button.
   */
  ctaUrl: string;
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
 * It displays a title, descriptive text, and a button linking to a contribution URL.
 */
const MaybeYouCard: React.FC<MaybeYouCardProps> = ({ ctaUrl, title, text }) => {
  const { t } = useTranslation('components/team');
  const isDesktop = useIsDesktop();

  const cardHeight = isDesktop ? 420 : 380; // Consistent with TeamMemberCard

  return (
    <Card
      sx={{
        border: '2px dashed', // Distinct border style
        borderColor: 'primary.main', // Use primary color for the dashed border
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        height: cardHeight,
        p: 2,
        width: isDesktop ? '100%' : '85vw', // Consistent with TeamMemberCard
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        textAlign: 'center', // Center text
        backgroundColor: 'action.hover', // Slightly different background
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <AddCircleOutlineIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 1.5 }}>
          {t(title, title)}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t(text, text)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: '12px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            px: 4, // Add some padding to the button
            py: 1,
          }}
        >
          {t('maybe_you_card.learn_more_button', 'Learn More')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MaybeYouCard;
