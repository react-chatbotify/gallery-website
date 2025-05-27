import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/images/logo.webp'; // Logo import
import FadeInOnView from '@/components/FadeComponent/FadeInOnView';
import Footer from '@/components/Home/Footer';

// Define types for the translation structure
type ContentItem = {
  point?: string;
  text: string;
};

type Section = {
  title: string;
  content: (string | ContentItem)[];
};

type PrivacyPolicyTranslation = {
  [sectionKey: string]: Section; // Dynamic section keys with a Section value
};

/**
 * Privacy Policy component that displays data collection, usage, and user rights.
 */
const PrivacyPolicy: React.FC = () => {
  // Use i18next to fetch translations dynamically
  const { t } = useTranslation('/pages/privacypolicy');

  // Type assertion for the translation data
  const privacyPolicy = t('privacy_policy_paragraphs', { returnObjects: true }) as PrivacyPolicyTranslation;

  // Sorting the section keys numerically
  const sortedKeys = Object.keys(privacyPolicy).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        px: { sm: '10%', xs: 0 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          pt: { xs: 12, sm: 11, md: 10 },
          pb: { xs: 4, sm: 6, md: 10 },
        }}
      >
        {/* Logo */}
        <FadeInOnView>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box
              component="img"
              src={logo}
              alt="React ChatBotify Gallery Logo"
              sx={{
                height: { xs: '54px', sm: '96px', md: '128px', lg: '160px', xl: '192px' },
              }}
            />
          </Box>

          {/* Header */}
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h3" color="text.primary" fontWeight="bold" gutterBottom>
              {t('privacy_policy.title')}
            </Typography>
            <Typography variant="h6" color="text.secondary" fontWeight="light" gutterBottom>
              {t('privacy_policy.subtitle')}
            </Typography>
          </Box>
        </FadeInOnView>

        {/* Sections */}
        {sortedKeys.map((sectionKey) => {
          const section = privacyPolicy[sectionKey];
          if (!section) return null;
          const { title, content } = section;
          const sectionNumber = sectionKey.padStart(2, '0');

          return (
            <FadeInOnView>
              <Box key={sectionKey} sx={{ mt: 5 }}>
                <Typography variant="h5" color="text.primary" fontWeight="bold">
                  <Typography variant="h5" color="text.secondary" component="span">
                    {sectionNumber}
                  </Typography>{' '}
                  {title}
                </Typography>

                {/* Plain text paragraphs */}
                {(content.filter((item) => typeof item === 'string') as string[]).map((text, idx) => (
                  <Typography key={`text-${idx}`} variant="body1" color="text.primary" sx={{ mt: 1, mb: 2 }}>
                    {text}
                  </Typography>
                ))}

                {/* Pointed items */}
                {(content.filter((item) => typeof item !== 'string') as ContentItem[]).map((item, idx) => (
                  <Typography key={`point-${idx}`} variant="body1" color="text.primary" sx={{ mt: 1, mb: 2 }}>
                    <strong>{item.point}</strong> {item.text}
                  </Typography>
                ))}
              </Box>
            </FadeInOnView>
          );
        })}

        {/* Effective date */}
        <Box sx={{ mt: 5, opacity: 0.5 }}>
          <Typography variant="body2" color="text.primary">
            {t('Effective date for this policy: 2nd of March 2025')}
          </Typography>
        </Box>
      </Container>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          px: { sm: 6, xs: 2 },
        }}
      >
        <Footer />
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
