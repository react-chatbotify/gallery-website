import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Blocks, BookOpen, Clock7, Link, LockKeyholeOpen, PencilRuler, Star, UsersRound } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SecondaryFeature } from '@/interfaces/HomePage';

export const HeadingAndDescription = ({ heading, description }: { heading: string; description: string }) => (
  <Box>
    <Container maxWidth={false}>
      <Grid container columnSpacing={20} rowSpacing={5} alignItems="center">
        <Grid item xs={12} md={5}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {heading}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="body1" color="text.muted">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const FeatureCard = ({ item }: { item: SecondaryFeature }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={cardStyles}>
      <Box sx={iconWrapperStyles}>
        <item.Icon size={20} />
      </Box>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.muted">
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default function FeaturesAndBenefitsSection() {
  const { t } = useTranslation('components/home');

  const items = useMemo(() => {
    const icons = [BookOpen, LockKeyholeOpen, UsersRound, Star, Link, PencilRuler, Blocks, Clock7];
    const itemsTexts = t('features_section.features', { returnObjects: true }) as SecondaryFeature[];
    return icons.map((Icon, index) => ({ Icon, ...itemsTexts[index] }));
  }, [t]);

  return (
    <Box sx={{ color: 'text.muted', display: 'grid', gap: 6, gridTemplateColumns: '100%' }}>
      <HeadingAndDescription heading={t('features_section.title')} description={t('features_section.heading.1')} />
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <FeatureCard key={index} item={item} />
        ))}
      </Grid>
    </Box>
  );
}

const cardStyles = {
  alignItems: 'flex-start',
  background: 'transparent',
  boxShadow: 'none',
  color: 'text.primary',
  display: 'flex',
  flexDirection: 'column',
  padding: 2,
};

const iconWrapperStyles = {
  aspectRatio: '1/1',
  backgroundColor: 'background.muted',
  borderRadius: 999,
  color: 'text.primary',
  display: 'grid',
  mx: '16px',
  padding: 2,
};
