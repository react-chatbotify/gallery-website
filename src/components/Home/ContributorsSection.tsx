import { Avatar, AvatarGroup, Box, Button, Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import projectimg from '../../assets/images/LandingPage/image.png';
import { HeadingAndDescription } from './FeaturesAndBenefitsSection';

/**
 * Shows the list of contributors for each project repository that helped make the overall project possible.
 */
const ContributorsSection = () => {
  const { t } = useTranslation('components/home');

  const avatars = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
    'https://randomuser.me/api/portraits/men/6.jpg',
  ];

  const GenericProjectCard = ({ name, description }: { name: string; description: string }) => (
    <Card sx={cardStyles}>
      <Box sx={imageWrapperStyles}>
        <CardMedia sx={imageStyles} image={projectimg} />
      </Box>
      <CardContent sx={cardContentStyles}>
        <Typography fontWeight="bold" variant="h6">
          {name}
        </Typography>
        <Typography color="text.muted" variant="body1">
          {description}
        </Typography>
        <AvatarGroup max={9} sx={{ justifyContent: 'start', my: 2 }}>
          {avatars.map((src, index) => (
            <Avatar sx={{ height: 30, width: 30 }} key={index} src={src} />
          ))}
        </AvatarGroup>
        <Box sx={bottomSectionStyles}>
          <Button sx={githubButtonStyles}>{t('contributors_section.GithubButton')}</Button>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: 'text.muted' }}>{t('contributors_section.ContributionSubheading')}</Typography>
            <Link sx={readMoreLinkStyles}>
              {t('contributors_section.ReadMore')} <ArrowRight size={16} />
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
  const projects = useMemo(() => {
    return t('contributors_section.projects', { returnObjects: true }) as { title: string; description: string }[];
  }, [t]);
  return (
    <Box sx={{ display: 'grid', gap: 6 }}>
      <HeadingAndDescription
        heading={t('contributors_section.title')}
        description={t('contributors_section.heading.1')}
      />
      <Box sx={gridContainerStyles}>
        <GenericProjectCard name={projects[0].title} description={projects[0].description} />
        <GenericProjectCard name={projects[1].title} description={projects[1].description} />
      </Box>
    </Box>
  );
};

export default ContributorsSection;

// Styles
const cardStyles = {
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'background.muted',
  borderRadius: '12px',
};

const imageWrapperStyles = {
  borderRadius: '17px',
  mt: 4,
  mx: 4,
  overflow: 'hidden',
};

const imageStyles = {
  border: '1px solid white',
  borderBottom: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottomWidth: 0,
  borderColor: 'background.muted',
  borderRadius: '17px',
  boxShadow: '0px 0px 50px 0px #5E5E5E0F',
  height: 200,
  mx: 2,
};

const cardContentStyles = {
  backgroundColor: 'background.paper',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  py: 5,
};

const bottomSectionStyles = {
  alignItems: 'center',
  display: 'flex',
  gap: 2,
};

const githubButtonStyles = {
  backgroundColor: 'background.secondary',
  borderRadius: '12px',
  color: 'text.primary',
  display: { md: 'block', xs: 'none' },
  p: '13px 24px',
  textTransform: 'capitalize',
};

const readMoreLinkStyles = {
  alignItems: 'center',
  display: 'flex',
  flexFlow: 'row',
  gap: 1,
};

const gridContainerStyles = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  justifyContent: 'center',
  m: 2,
  my: 4,
};
