import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { ArrowRight, Blocks, PaletteIcon, SparkleIcon, Sun } from 'lucide-react';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Endpoints } from '@/constants/Endpoints';
import useIsDesktop from '@/hooks/useIsDesktop';
import { FeatureItemProps, PrimaryFeature } from '@/interfaces/HomePage';

import cliDemo from '../../assets/images/LandingPage/Demos/cli_demo.webp';
import llmDemo from '../../assets/images/LandingPage/Demos/llm_demo.webp';
import pluginDemo from '../../assets/images/LandingPage/Demos/plugin_demo.webp';
import themeDemo from '../../assets/images/LandingPage/Demos/theme_demo.webp';
import FadeInOnView from '../FadeComponent/FadeInOnView';
import { HeadingAndDescription } from './FeaturesAndBenefitsSection';

const featureStyles = (theme: any, selected: boolean) => ({
  '&:hover': {
    backgroundColor: theme.palette.background.muted,
    boxShadow: theme.shadows[1],
    opacity: 1,
  },
  alignItems: 'center',
  backgroundColor: selected ? theme.palette.background.muted : 'transparent',
  borderRadius: '12px',
  boxShadow: selected ? theme.shadows[2] : 'none',
  cursor: 'pointer',
  display: 'flex',
  gap: theme.spacing(2),
  opacity: selected ? 1 : 0.5,
  p: theme.spacing(2),
  transition: 'background-color 0.3s, box-shadow 0.3s',
});

const actionButtonStyles = (theme: any) => ({
  backgroundColor: theme.palette.background.secondary,
  borderRadius: '8px',
  color: theme.palette.text.primary,
  gap: theme.spacing(1),
  justifyContent: 'space-between',
  ml: 'auto',
  px: 2,
  textTransform: 'none',
  width: '165px',
});

const placeholderGifs = [themeDemo, pluginDemo, llmDemo, cliDemo];

const FeatureItem: FC<FeatureItemProps & { onClick: () => void }> = ({
  Icon,
  url,
  heading,
  description,
  actionText,
  onClick,
  selected,
}) => (
  <FadeInOnView>
    <Box sx={(theme) => featureStyles(theme, selected)} onClick={onClick}>
      <IconButton>
        <Icon size={24} />
      </IconButton>
      <Box>
        <Typography fontWeight="bold">{heading}</Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Box>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          window.open(url, '_blank');
        }}
        sx={(theme) => actionButtonStyles(theme)}
      >
        {actionText} <ArrowRight size={16} />
      </Button>
    </Box>
  </FadeInOnView>
);

const MobileFeatureItem: FC<FeatureItemProps & { onClick: () => void }> = ({
  Icon,
  url,
  heading,
  description,
  actionText,
  onClick,
  selected,
}) => (
  <FadeInOnView>
    <Box
      sx={(theme) => ({
        ...featureStyles(theme, selected),
        flexDirection: 'column',
      })}
      onClick={onClick}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'grid',
          gridAutoFlow: 'column',
          mb: 1,
          width: '100%',
        }}
      >
        <IconButton>
          <Icon size={24} />
        </IconButton>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            window.open(url, '_blank');
          }}
          sx={(theme) => actionButtonStyles(theme)}
        >
          {actionText} <ArrowRight size={16} />
        </Button>
      </Box>
      <Box>
        <Typography fontWeight="bold">{heading}</Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Box>
    </Box>
  </FadeInOnView>
);

/**
 * FeaturesAtGlanceSection displays and previews a list of key features.
 */
const FeaturesAtGlanceSection = (): JSX.Element => {
  // lazy loads translations
  const { t } = useTranslation('components/home');

  const isDesktop = useIsDesktop();
  const theme = useTheme();
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = useMemo(() => {
    const icons = [Sun, PaletteIcon, Blocks, SparkleIcon];
    // todo: update urls after domain is consolidated and CLI tool is ready
    const urls = ['/themes', '/plugins', Endpoints.projectLlmExampleUrl, 'https://example.com/feature-4'];

    const items = t('features_at_glance_section_section.features', {
      returnObjects: true,
    }) as PrimaryFeature[];

    return icons.map((Icon, i) => ({
      ...items[i],
      Icon,
      url: urls[i],
    }));
  }, [t]);

  return (
    <Box sx={{ display: 'grid', gap: theme.spacing(6) }}>
      {/* Heading */}
      <FadeInOnView>
        <HeadingAndDescription
          heading={t('features_at_glance_section_section.title')}
          description={t('features_at_glance_section_section.heading.1')}
        />
      </FadeInOnView>

      {/* Grid of Features + Preview */}
      <Box
        sx={{
          alignItems: 'start',
          display: 'grid',
          gap: theme.spacing(4),
          gridAutoFlow: isDesktop ? 'column' : 'row',
          gridTemplateColumns: isDesktop ? '1fr 1fr' : '100%',
          p: theme.spacing(4),
        }}
      >
        {/* Feature List */}
        <Box sx={{ display: 'grid', gap: theme.spacing(4) }}>
          {features.map((feat, idx) =>
            isDesktop ? (
              <FeatureItem
                key={idx}
                {...feat}
                selected={selectedFeature === idx}
                onClick={() => setSelectedFeature(idx)}
              />
            ) : (
              <MobileFeatureItem
                key={idx}
                {...feat}
                selected={selectedFeature === idx}
                onClick={() => setSelectedFeature(idx)}
              />
            )
          )}
        </Box>

        <FadeInOnView>
          <Box
            sx={{
              alignItems: 'center',
              alignSelf: 'start',
              backgroundColor: theme.palette.background.paper,
              borderRadius: '12px',
              boxShadow: theme.shadows[1],
              display: 'flex',
              justifyContent: 'center',
              p: theme.spacing(2),
            }}
          >
            <Box
              component="img"
              src={placeholderGifs[selectedFeature]}
              alt={`Preview ${selectedFeature + 1}`}
              sx={{
                borderRadius: 2,
                maxWidth: { lg: '60%', md: '80%', xl: '40%', xs: '100%' },
              }}
            />
          </Box>
        </FadeInOnView>
      </Box>
    </Box>
  );
};

export default FeaturesAtGlanceSection;
