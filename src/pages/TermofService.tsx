import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation("/pages/termofservice");

  // Type assertion for the translation data
  const termsOfService = t("terms_of_service", { returnObjects: true }) as TermsOfServiceTranslation;

  // Sorting the section keys numerically
  const sortedKeys = Object.keys(termsOfService).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="h3" color="text.primary" fontWeight="bold" gutterBottom>
          {t("Terms of Service")}
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight="light" gutterBottom>
          {t("While open source libraries encourage collaboration and accessibility, it's essential to ensure that users and contributors understand their rights and responsibilities. Our Terms of Service provide clear guidelines on usage, modification and distribution.")}
        </Typography>
      </Box>

      {/* Loop through the sections in the sorted order */}
      {sortedKeys.map((sectionKey) => {
        const section = termsOfService[sectionKey];
        const { title, content } = section;
        const sectionNumber = sectionKey.padStart(2, '0'); // Adding leading zero to the section number if needed

        return (
          <Box key={sectionKey} sx={{ mt: 5 }}>
            <Typography variant="h5" color="text.primary" fontWeight="bold">
              <Typography variant="h5" color="text.secondary" component="span">
                {sectionNumber} {/* Section number in a lighter, secondary font */}
              </Typography> 
              {title} {/* Title in bold */}
            </Typography>

            {/* Handle content rendering */}
            <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
              {content
                .filter((item) => typeof item === "string") // Only get simple paragraphs
                .join(" ")} {/* Join them into a single paragraph */}
            </Typography>

            {content
              .filter((item) => typeof item !== "string") // Handle points separately
              .map((item, index) => (
                <Typography key={index} variant="body1" color="text.primary" sx={{ mt: 1 }}>
                  <strong>{item.point}</strong> {item.text}
                </Typography>
              ))}
          </Box>
        );
      })}

      <Box sx={{ mt: 5, opacity: 0.5 }}>
        <Typography variant="body2" color="text.primary">
          {t("Effective date for this policy: 2nd of March 2025")}
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;
