import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import ChatBot from 'react-chatbotify';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

import logo from '@/assets/images/logo.png';

const HeroSection = () => {
  const { t } = useTranslation('components/home');

  const link_buttons = useMemo(() => {
    const texts = t('hero_section.links', { returnObjects: true }) as string[];
    const urls = [
      'https://react-chatbotify.com/docs/introduction/quickstart',
      'https://react-chatbotify.com/playground',
      'https://gallery.react-chatbotify.com/themes',
      'https://gallery.react-chatbotify.com/plugins',
    ];

    return texts.map((text, i) => ({
      text,
      url: urls[i] ?? '#',
    }));
  }, [t]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('npm install react-chatbotify');
  }, []);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: { lg: 'row', md: 'column' },
        gap: 8,
        height: 'calc(100vh - 200px)',
        p: 7,
        width: '100%',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: { md: '60vw', xs: 'auto' },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 32,
              width: 32,
            }}
          />
          <Typography fontWeight="bold" color="text.secondary">
            {t('essentials.name')}
          </Typography>
        </Box>

        <Typography variant="h2" fontWeight={700} gutterBottom>
          {t('hero_section.title')}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {t('hero_section.heading.1')}
        </Typography>

        <Stack direction={{ md: 'row', xs: 'column' }} alignItems={{ md: 'center', xs: 'start' }} spacing={4}>
          {/* NPMCommand */}
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.muted',
              borderRadius: '16px',
              display: 'flex',
              gap: 3,
              pl: '16px',
              pr: '10px',
              py: '8px',
            }}
          >
            <Typography variant="body2">npm install react-chatbotify</Typography>
            <Button
              variant="contained"
              onClick={handleCopy}
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
              }}
            >
              {t('hero_section.copyText')}
            </Button>
          </Box>

          {/* GitHubStats */}
          <Box
            sx={{
              display: 'flex',
              gap: 8,
              pl: '20px',
            }}
          >
            {[
              { count: 250, text: t('hero_section.starText') },
              { count: 138, text: t('hero_section.forkText') },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: 1,
                }}
              >
                <FaGithub size={20} />
                <Typography variant="body2">
                  {item.text} {item.count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {link_buttons.map((link_button, index) => (
            <Link
              key={index}
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: 1,
              }}
              href={link_button.url}
              target="_blank"
            >
              {link_button.text} <ArrowRight size={16} />
            </Link>
          ))}
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          alignItems: 'center',
          alignSelf: 'center',
          display: 'flex',
          height: 450,
          justifyContent: 'center',
          minWidth: 300,
          pt: 12,
        }}
      >
        <ChatBot settings={{ general: { embedded: true } }} />
      </Box>
    </Box>
  );
};

export default HeroSection;
