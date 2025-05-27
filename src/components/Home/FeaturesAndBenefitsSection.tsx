import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Blocks, BookOpen, BrainCircuit, Link, LockKeyholeOpen, PencilRuler, Server, UsersRound } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SecondaryFeature } from '@/interfaces/HomePage';

import FadeInOnView from '../FadeComponent/FadeInOnView';

/**
 * Renders a section heading and description side by side.
 *
 * @param heading the title text for the section
 * @param description the descriptive subtitle text
 */
export const HeadingAndDescription = ({ heading, description }: { heading: string; description: string }) => (
  <FadeInOnView>
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
  </FadeInOnView>
);

/**
 * Displays a single feature card with an icon, title, and description.
 *
 * @param item the feature data including Icon component, title, and description
 */
const FeatureCard = ({ item }: { item: SecondaryFeature }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <FadeInOnView>
        <Card
          sx={{
            alignItems: 'flex-start',
            background: 'transparent',
            borderRadius: 2,
            boxShadow: 'none',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            transition: 'box-shadow 0.3s, transform 0.3s',
          }}
        >
          {/* Icon container */}
          <Box
            sx={{
              aspectRatio: '1/1',
              backgroundColor: 'background.muted',
              borderRadius: '50%',
              color: 'text.primary',
              display: 'grid',
              height: 48,
              mb: 2,
              placeItems: 'center',
              width: 48,
            }}
          >
            <item.Icon size={24} />
          </Box>
          <CardContent sx={{ p: 0 }}>
            {/* Feature title */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {item.title}
            </Typography>
            {/* Feature description */}
            <Typography variant="body2" color="text.muted">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      </FadeInOnView>
    </Grid>
  );
};

/**
 * FeaturesAndBenefitsSection renders a list of secondary features.
 */
const FeaturesAndBenefitsSection = (): JSX.Element => {
  // lazy loads translations
  const { t } = useTranslation('components/home');

  // build array of feature items combining icons and translated text
  const items = useMemo(() => {
    const icons = [BookOpen, LockKeyholeOpen, Link, BrainCircuit, UsersRound, PencilRuler, Blocks, Server];
    const texts = t('features_section.features', { returnObjects: true }) as SecondaryFeature[];
    return icons.map((Icon, i) => ({
      ...texts[i],
      Icon,
    }));
  }, [t]);

  return (
    <Box sx={{ color: 'text.muted', display: 'grid', gap: 6 }}>
      {/* Section heading and description */}
      <HeadingAndDescription heading={t('features_section.title')} description={t('features_section.heading.1')} />
      {/* Grid of feature cards */}
      <Grid container spacing={3}>
        {items.map((item, idx) => (
          <FeatureCard key={idx} item={item} />
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesAndBenefitsSection;
