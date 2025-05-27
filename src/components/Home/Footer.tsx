import { Box, Link, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

import logo from '@/assets/images/logo.webp';
import { Endpoints } from '@/constants/Endpoints';

import FadeInOnView from '../FadeComponent/FadeInOnView';

/**
 * Footer component displays site branding, social links, and grouped navigation links.
 */
const Footer = (): JSX.Element => {
  const genericLinksStyles = { ':hover': { color: 'text.primary' }, color: 'text.muted', textDecoration: 'none' };
  const { t } = useTranslation('components/home');
  const footerLinks = useMemo(() => {
    return t('footer.links', { returnObjects: true }) as any;
  }, [t]);

  return (
    <FadeInOnView>
      <Box component="footer" sx={{ color: 'text.primary', p: 4, pb: 15 }}>
        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={4} justifyContent="space-between">
          <Stack justifyContent="space-between" spacing={5}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box component="img" src={logo} alt="Logo" sx={{ height: 32, width: 32 }} />
              <Typography fontWeight="bold" variant="h6">
                {t('essentials.name')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Link
                sx={genericLinksStyles}
                href={Endpoints.projectCoreDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord size={25} />
              </Link>
              <Link sx={genericLinksStyles} href={Endpoints.gitHubCoreOrgUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub size={25} />
              </Link>
              <Link sx={genericLinksStyles} href={Endpoints.instagramCoreUrl} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={25} />
              </Link>
              <Link sx={genericLinksStyles} href={Endpoints.twitterCoreUrl} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={25} />
              </Link>
            </Stack>
          </Stack>
          <Stack spacing={3}>
            <Typography fontWeight="bold" variant="h6">
              {footerLinks[0].title}
            </Typography>
            <Link sx={genericLinksStyles} href="#">
              {footerLinks[0].children[0]}
            </Link>
            <Link sx={genericLinksStyles} href="#">
              {footerLinks[0].children[1]}
            </Link>
          </Stack>
          <Stack spacing={3}>
            <Typography fontWeight="bold" variant="h6">
              {footerLinks[1].title}
            </Typography>
            <Link
              sx={genericLinksStyles}
              href={Endpoints.projectQuickStartUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerLinks[1].children[0]}
            </Link>
            <Link
              sx={genericLinksStyles}
              href={`${Endpoints.projectCoreRepoUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerLinks[1].children[1]}
            </Link>
          </Stack>
          <Stack spacing={3}>
            <Typography fontWeight="bold" variant="h6">
              {footerLinks[2].title}
            </Typography>
            <Link sx={genericLinksStyles} href="#">
              {footerLinks[2].children[0]}
            </Link>
            <Link sx={genericLinksStyles} href="#">
              {footerLinks[2].children[1]}
            </Link>
          </Stack>
        </Stack>
      </Box>
    </FadeInOnView>
  );
};

export default Footer;
