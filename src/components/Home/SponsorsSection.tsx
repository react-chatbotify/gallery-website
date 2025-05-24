import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { PiggyBank } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { HeadingAndDescription } from './FeaturesAndBenefitsSection';

const sponsors = [
  'Laura Lemon',
  'Pete Pineapple',
  'Johnny Jackfruit',
  'Courtney Cucumber',
  'Gary Grape',
  'Monica Mango',
  'Sally Strawberry',
  'Zach Zucchini',
  'Rory Rhubarb',
  'Tanya Tangerine',
];

const SponsorCard = () => {
  const { t } = useTranslation('components/home');
  const { title, description, contact } = useMemo(() => {
    return t('sponsors_section.sponsor_cta', { returnObjects: true }) as {
      title: string;
      description: string;
      contact: string;
    };
  }, [t]);
  return (
    <Box
      sx={{
        border: '1px solid white',
        borderColor: 'background.muted',
        borderRadius: '12px',
        color: 'text.primary',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: '16px',
        px: '25px',
        py: '25px',
      }}
    >
      <PiggyBank size={30} />
      <div>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body1" color="text.muted">
          {description}
        </Typography>
      </div>
      <Link
        href="#"
        sx={{
          ':hover': { textDecoration: 'underline' },
          alignItems: 'center',
          color: 'primary.main',
          display: 'inline-flex',
          fontSize: '14px',
          fontWeight: '500',
          gap: '6px',
          marginTop: '8px',
          textDecoration: 'none',
        }}
      >
        {contact} →
      </Link>
    </Box>
  );
};

export default function SponsorsSection() {
  const { t } = useTranslation('components/home');
  return (
    <Box sx={{ display: 'grid', gap: 6, mx: 'auto' }}>
      <HeadingAndDescription heading={t('sponsors_section.title')} description={t('sponsors_section.heading.1')} />
      <Container maxWidth={false}>
        <Grid container columnSpacing={20} rowSpacing={5} alignItems="center">
          {/* Left Side: names and stuff */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                color: 'text.muted',
                display: 'grid',
                gap: 3,
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            >
              {sponsors.map((row, index) => (
                <Typography key={index} variant="body1">
                  {row}
                </Typography>
              ))}
            </Box>
            <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 3 }} color="gray">
              And <strong>14</strong> other amazing human beings who didn’t want to disclose their names in public.{' '}
              <strong>We thank you all!</strong>
            </Typography>
          </Grid>

          {/* Right Side: CTA */}
          <Grid item xs={12} md={7}>
            <SponsorCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
