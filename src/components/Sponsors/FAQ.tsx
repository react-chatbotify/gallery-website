import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

type FAQ = {
  question: string;
  answer?: string;
};
const FAQ: React.FC = () => {
  const { t } = useTranslation('components/faq');
  const faqs = t('faqs', { returnObjects: true }) as FAQ[];
  return (
    <Box mt={8}>
      <Typography sx={{ fontWeight: 600, fontSize: '40px', lineHeight: 0.8, textAlign: 'center' }}>
        {t('heading')}
      </Typography>
      <Typography
        sx={{ fontWeight: 400, fontSize: '16px', lineHeight: 1.75, color: 'text.tertiary', textAlign: 'center', mt: 3 }}
      >
        {t('text_part_1')} <Link>{t('link_text')}</Link> {t('text_part_2')}
      </Typography>
      <Box mt={4} sx={{ maxWidth: { md: 640 }, justifySelf: 'center' }}>
        {faqs.map((faq) => (
          <Accordion
            sx={{
              my: 2,
              backgroundColor: 'transparent',
              boxShadow: 'none',
              backgroundImage: 'none',
              '&.MuiAccordion-root:before': { backgroundColor: 'transparent' },
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown />}>
              <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: 1.5 }}>{faq.question}</Typography>
            </AccordionSummary>
            {faq.answer ? (
              <AccordionDetails>
                <Typography sx={{ color: 'text.tertiary' }}>
                  The bare minimum is one (1) USD per month. So with 12 dollars, you can contribute to this project for
                  a whole year and get listed as a bronze-tier supporter.
                </Typography>
              </AccordionDetails>
            ) : null}
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
