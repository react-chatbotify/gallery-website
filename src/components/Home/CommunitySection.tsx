import { Box, Button, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

import { Endpoints } from '@/constants/Endpoints';
import useIsDesktop from '@/hooks/useIsDesktop';

import FadeInOnView from '../FadeComponent/FadeInOnView';
import { HeadingAndDescription } from './FeaturesAndBenefitsSection';

/**
 * CommunitySection renders a list of community links with icons, titles, and descriptions.
 */
const CommunitySection = (): JSX.Element => {
  // lazy loads translations
  const { t } = useTranslation('components/home');

  const isDesktop = useIsDesktop();

  // define community link items with icon, title, body text, and URL
  const links = [
    {
      Icon: <FaDiscord size={26} />,
      text: t('community_section.discord.body_text'),
      title: t('community_section.discord.heading'),
      url: Endpoints.projectCoreDiscordUrl,
    },
    {
      Icon: <FaGithub size={26} />,
      text: t('community_section.github.body_text'),
      title: t('community_section.github.heading'),
      url: Endpoints.gitHubCoreOrgUrl,
    },
    {
      Icon: <FaInstagram size={26} />,
      text: t('community_section.instagram.body_text'),
      title: t('community_section.instagram.heading'),
      url: Endpoints.instagramCoreUrl,
    },
    {
      Icon: <FaTwitter size={26} />,
      text: t('community_section.twitter.body_text'),
      title: t('community_section.twitter.heading'),
      url: Endpoints.twitterCoreUrl,
    },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 6, mx: 'auto' }}>
      {/* Section heading and description */}
      <FadeInOnView>
        <HeadingAndDescription heading={t('community_section.title')} description={t('community_section.heading.1')} />
      </FadeInOnView>

      {/* Community link buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: isDesktop ? 4 : 1,
        }}
      >
        {links.map(({ Icon, title, text, url }, idx) => (
          <FadeInOnView key={idx}>
            {/* Open community URL in new tab */}
            <Button
              fullWidth
              onClick={() => window.open(url, '_blank')}
              sx={{
                display: isDesktop ? 'flex' : 'grid',
                ...buttonStyles,
              }}
            >
              <Box sx={contentBoxStyles}>
                {Icon}
                <Box sx={textBoxStyles}>
                  <Typography fontWeight="bold">{title}</Typography>
                  <Typography color="text.muted">{text}</Typography>
                </Box>
              </Box>
              <ArrowRight size={24} style={{ color: 'text.muted' }} />
            </Button>
          </FadeInOnView>
        ))}
      </Box>
    </Box>
  );
};

export default CommunitySection;

// Styles
const buttonStyles = {
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid',
  borderColor: 'background.muted',
  borderRadius: '12px',
  gridTemplateColumns: '90% 10%',
  color: 'text.primary',
  p: 3,
  px: '32px',
  textTransform: 'none',
};

const contentBoxStyles = {
  alignItems: { md: 'center', xs: 'start' },
  display: 'flex',
  flexDirection: { md: 'row', xs: 'column' },
  gap: 3,
};

const textBoxStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  textAlign: 'start',
};
