import { Box, Typography } from '@mui/material';
import React from 'react';

/**
 * Displays relevant content within a single card.
 * 
 * @param icon icon shown in the card
 * @param heading title of the card
 * @param paragraph content paragraph in the card
 */
const Card: React.FC<{
  icon: React.ReactNode;
  heading: string;
  paragraph: string;
}> = ({
  icon,
  heading,
  paragraph
}) => {
  return (
    <Box
      sx={{
        maxWidth: '24rem',
        padding: 3,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'accent.500',
        borderRadius: 2,
        boxShadow: 2,
        textAlign: 'center',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Icon Container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          padding: 2,
          color: 'secondary.700',
          width: 'fit-content',
          margin: '0 auto',
        }}
      >
        {icon}
      </Box>

      {/* Heading */}
      <Typography
        variant="h5"
        sx={{
          marginBottom: 1,
          fontWeight: 'bold',
          fontSize: '1.5rem',
          letterSpacing: '0.05em',
        }}
      >
        {heading}
      </Typography>

      {/* Paragraph */}
      <Typography
        sx={{
          fontSize: { xs: '1rem', lg: '1.125rem' },
          fontWeight: 'normal',
        }}
      >
        {paragraph}
      </Typography>
    </Box>
  );
};

export default Card;
