import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/images/logo.webp'; // Added logo import
import FadeInOnView from '@/components/FadeComponent/FadeInOnView';
import Footer from '@/components/Home/Footer';

// Define types for the translation structure
interface ContentItem {
  point?: string;
  text: string;
}

interface Section {
  title: string;
  content: (string | ContentItem)[];
}

interface TermsOfServiceTranslation {
  [sectionKey: string]: Section; // Dynamic section keys with a Section value
}

/**
 * Terms of Service component that displays platform policies and guidelines.
 */
const TermsOfService: React.FC = () => {
  // Use i18next to fetch translations dynamically
  const { t } = useTranslation('/pages/termsofservice');

  // Type assertion for the translation data
  const termsOfService = t('terms_of_service_paragraphs', { returnObjects: true }) as TermsOfServiceTranslation;

  // Sorting the section keys numerically
  const sortedKeys = Object.keys(termsOfService).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

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
        {/* Added Logo Element */}
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

          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h3" color="text.primary" fontWeight="bold" gutterBottom>
              {t('terms_of_service.title')}
            </Typography>
            <Typography variant="h6" color="text.secondary" fontWeight="light" gutterBottom>
              {t('terms_of_service.subtitle')}
            </Typography>
          </Box>
        </FadeInOnView>

        {/* Loop through the sections in the sorted order */}
        {sortedKeys.map((sectionKey) => {
          const section = termsOfService[sectionKey];
          if (!section) return null; // Guard for potentially undefined sections
          const { title, content } = section;
          const sectionNumber = sectionKey.padStart(2, '0');

          return (
            <FadeInOnView>
              <Box key={sectionKey} sx={{ mt: 5 }}>
                <Typography variant="h5" color="text.primary" fontWeight="bold">
                  <Typography variant="h5" color="text.secondary" component="span">
                    {sectionNumber} {/* Section number in a lighter, secondary font */}
                  </Typography>{' '}
                  {title} {/* Title in bold - space confirmed */}
                </Typography>

                {/* Handle content rendering */}
                {/* Render simple string items each as a separate paragraph */}
                {(content.filter((item) => typeof item === 'string') as string[]).map((text, index) => (
                  <Typography key={`text-${index}`} variant="body1" color="text.primary" sx={{ mt: 1, mb: 2 }}>
                    {text}
                  </Typography>
                ))}

                {/* Handle point/text items */}
                {(content.filter((item) => typeof item !== 'string') as ContentItem[]).map((item, index) => (
                  <Typography key={`point-${index}`} variant="body1" color="text.primary" sx={{ mt: 1, mb: 2 }}>
                    <strong>{item.point}</strong> {item.text}
                  </Typography>
                ))}
              </Box>
            </FadeInOnView>
          );
        })}

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

export default TermsOfService;
