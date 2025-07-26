import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import React from 'react';
const FAQ: React.FC = () => {
  return (
    <Box mt={8}>
      <Typography sx={{ fontWeight: 600, fontSize: '40px', lineHeight: 0.8, textAlign: 'center' }}>
        Frequently asked
      </Typography>
      <Typography
        sx={{ fontWeight: 400, fontSize: '16px', lineHeight: 1.75, color: '#A7AFB8', textAlign: 'center', mt: 3 }}
      >
        Got questions? Hit us up <Link> on our Discord</Link> or check the most common ones below.
      </Typography>
      <Box mt={4} sx={{ maxWidth: { md: 640 }, justifySelf: 'center' }}>
        <Accordion>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: 1.5 }}>
              What is the minimum monetary amount to start sponsoring you?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: '#A7AFB8' }}>
              The bare minimum is one (1) USD per month. So with 12 dollars, you can contribute to this project for a
              whole year and get listed as a bronze-tier supporter.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: 1.5 }}>
              Why should our company sponsor your project?
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: 1.5 }}>
              Can I down- or upgrade sponsor tiers? How and when?
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: 1.5 }}>
              Do you have any kind of collaboration deals with educational orgs?
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{ my: 2 }}>
          <AccordionSummary expandIcon={<ChevronDown />}>
            <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: 1.5 }}>
              What if the project ends - will I be refunded somehow?
            </Typography>
          </AccordionSummary>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FAQ;
