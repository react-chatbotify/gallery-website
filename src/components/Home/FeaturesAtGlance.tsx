import { Box, Button, IconButton, Typography } from '@mui/material';
import { ArrowRight, Blocks, PaletteIcon, SparkleIcon, Sun } from 'lucide-react';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useIsDesktop from '@/hooks/useIsDesktop';
import { FeatureItemProps, PrimaryFeature } from '@/interfaces/HomePage';

import { HeadingAndDescription } from './FeaturesAndBenefitsSection';

// Shared styles
const featureStyles = (selected: boolean) => ({
  '&:hover': { backgroundColor: 'background.muted' },
  alignItems: 'center',
  backgroundColor: selected ? 'background.muted' : 'transparent',
  border: '1px solid',
  borderColor: selected ? 'background.secondary' : 'transparent',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  gap: 2,
  opacity: selected ? 1 : 0.5,
  p: 2,
  transition: 'background-color 0.3s',
});

const actionButtonStyles = {
  backgroundColor: 'background.secondary',
  borderRadius: '8px',
  color: 'text.primary',
  gap: 1,
  ml: 'auto',
  textTransform: 'none',
};

// Desktop Feature Item
const FeatureItem: FC<FeatureItemProps> = ({ Icon, heading, description, actionText, onClick, selected }) => (
  <Box sx={featureStyles(selected)} onClick={onClick}>
    <IconButton>{<Icon />}</IconButton>
    <Box>
      <Typography fontWeight="bold">{heading}</Typography>
      <Typography color="text.secondary" variant="body2">
        {description}
      </Typography>
    </Box>
    <Button sx={actionButtonStyles}>
      {actionText} <ArrowRight size={16} />
    </Button>
  </Box>
);

// Mobile Feature Item
const MobileFeatureItem: FC<FeatureItemProps> = ({ Icon, heading, description, actionText, onClick, selected }) => (
  <Box sx={{ ...featureStyles(selected), flexFlow: 'column' }} onClick={onClick}>
    <Box sx={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: '100%', width: '100%' }}>
      <IconButton sx={{ justifySelf: 'start' }}>{<Icon />}</IconButton>
      <Button sx={actionButtonStyles}>
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
);

// Main FeaturesAtGlance component
const FeaturesAtGlance: FC = () => {
  const { t } = useTranslation('components/home');
  const [selectedFeature, setSelectedFeature] = useState<number>(0);
  const isDesktop = useIsDesktop();
  const features = useMemo(() => {
    const icons = [Sun, PaletteIcon, Blocks, SparkleIcon];
    const itemsTexts = t('primary_features_section.features', { returnObjects: true }) as PrimaryFeature[];
    return icons.map((Icon, index) => ({ ...itemsTexts[index], Icon }));
  }, [t]);

  return (
    <Box sx={{ display: 'grid', gap: 6 }}>
      <HeadingAndDescription
        description={t('primary_features_section.heading.1')}
        heading={t('primary_features_section.title')}
      />
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridAutoFlow: isDesktop ? 'column' : 'row',
          gridTemplateColumns: isDesktop ? '1fr 1fr' : '100%',
          p: 4,
        }}
      >
        <Box>
          <Box sx={{ display: 'grid', gap: 2 }}>
            {features.map((feature, index) =>
              isDesktop ? (
                <FeatureItem
                  key={index}
                  {...feature}
                  selected={selectedFeature === index}
                  onClick={() => setSelectedFeature(index)}
                />
              ) : (
                <MobileFeatureItem
                  key={index}
                  {...feature}
                  selected={selectedFeature === index}
                  onClick={() => setSelectedFeature(index)}
                />
              )
            )}
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'background.paper',
            borderRadius: '12px',
            display: 'flex',
            gridRow: isDesktop ? '1 / -1' : '1 / 2',
            height: 250,
            justifyContent: 'center',
          }}
        >
          <Typography color="text.secondary">Feature Preview</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesAtGlance;
