import { Box, Button, Link, Stack, Typography } from '@mui/material';
import InputValidator, { InputValidatorBlock } from '@rcb-plugins/input-validator';
import LlmConnector, { GeminiProvider, LlmConnectorBlock } from '@rcb-plugins/llm-connector';
import MarkdownRenderer, { MarkdownRendererBlock } from '@rcb-plugins/markdown-renderer';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatBot, { Flow } from 'react-chatbotify';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

import logo from '@/assets/images/logo.webp';
import { Endpoints } from '@/constants/Endpoints';
import useFetchGitHubRepoInfo from '@/hooks/useFetchGitHubRepoInfo';
import useIsDesktop from '@/hooks/useIsDesktop';

import RcbMarkdown from '../RcbMarkdown/RcbMarkdown';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, transition: { duration: 0.6 }, y: 0 },
};

/**
 * Shows the landing page with catch phrases and common/helpful links/buttons and a chatbot preview.
 */
const HeroSection = (): JSX.Element => {
  const { t } = useTranslation('components/home');
  const isDesktop = useIsDesktop();
  const [titleIndex, setTitleIndex] = useState(1);

  const { stars, forks, repoUrl, loading } = useFetchGitHubRepoInfo(
    'React ChatBotify',
    'tjtanjin/react-chatbotify',
    false
  );

  // rotates title every 4 seconds
  const numTitles = 5;
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev >= numTitles ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTitle = t(`hero_section.title.${titleIndex}`);
  const link_buttons = useMemo(() => {
    const texts = t('hero_section.links', { returnObjects: true }) as string[];
    const urls = [Endpoints.projectQuickStartUrl, Endpoints.youtubeCoreUrl, Endpoints.projectPlaygroundUrl, '/plugins'];
    return texts.map((text, i) => ({ text, url: urls[i] ?? '#' }));
  }, [t]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('npm install react-chatbotify');
  }, []);

  // chatbot plugins
  const plugins = useMemo(
    () => [LlmConnector(), MarkdownRenderer({ markdownComponent: RcbMarkdown }), InputValidator()],
    []
  );

  // chatbot flow
  const flow: Flow = {
    start: {
      message:
        'Hi there! 👋 Thank you for checking out React ChatBotify 😊 Ask me anything or explore how easy it is to build chatbots with React ChatBotify!',
      chatDisabled: true,
      transition: 0,
      path: 'gemini',
    },
    gemini: {
      llmConnector: {
        // provider configuration guide:
        // https://github.com/React-ChatBotify-Plugins/llm-connector/blob/main/docs/providers/Gemini.md
        provider: new GeminiProvider({
          mode: 'proxy',
          baseUrl: import.meta.env.VITE_RAG_QUERY_API_URL,
          model: 'gemini-2.0-flash-lite:streamGenerateContent',
          responseFormat: 'stream',
          headers: {
            'X-API-KEY': import.meta.env.VITE_RAG_QUERY_API_KEY,
          },
        }),
        historySize: 5,
        outputType: 'character',
      },
      renderMarkdown: ['BOT'],
      validateTextInput(userInput) {
        if (userInput && userInput.length > 1000) {
          return {
            success: false,
            promptContent: 'Input characters must be less than 1000!',
            promptDuration: 3000,
            promptType: 'error',
            highlightTextArea: true,
          };
        }
        return { success: true };
      },
    } as LlmConnectorBlock & MarkdownRendererBlock & InputValidatorBlock,
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: { lg: 'row', xs: 'column' },
        gap: { lg: 8, xs: 4 },
        minHeight: { md: 'calc(100vh - 200px)', xs: 'auto' },
        position: 'relative',
        pt: { md: 0, xs: '97px' },
        px: { md: 7, sm: 3, xs: 1 },
        py: { md: 7 },
        width: '100%',
      }}
    >
      {/* Left Column */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: !isDesktop ? '100%' : '60vw',
          width: '100%',
        }}
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          {!isDesktop ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Box component="img" src={logo} alt="Logo" sx={{ height: 96, width: 96 }} />
            </Box>
          ) : (
            <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
              <Box component="img" src={logo} alt="Logo" sx={{ height: 32, width: 32 }} />
              <Typography fontWeight="bold" color="text.secondary">
                {t('essentials.name')}
              </Typography>
            </Box>
          )}
        </motion.div>

        {/* Animated Title */}
        <motion.div variants={itemVariants} key={titleIndex}>
          <AnimatePresence mode="wait">
            <motion.div
              key={titleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              style={{ width: '100%' }}
            >
              <Typography
                variant="h2"
                fontWeight={700}
                gutterBottom
                lineHeight="1.2"
                sx={{
                  fontSize: { md: '4rem', xs: '2.8rem' },
                  lineHeight: 1.2,
                  maxWidth: { md: 700, xs: '100%' },
                  minHeight: { md: '9.6rem', xs: '13.44rem' },
                  mx: { md: 0, xs: 'auto' },
                  textAlign: { md: 'left', xs: 'center' },
                }}
              >
                {currentTitle}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{
              maxWidth: { md: 600, xs: '100%' },
              mx: { md: 0, xs: 'auto' },
              textAlign: { md: 'left', xs: 'center' },
            }}
          >
            {t('hero_section.heading.1')}
          </Typography>
        </motion.div>

        {/* Buttons & Stats */}
        <motion.div variants={itemVariants}>
          <Stack direction={{ md: 'row', xs: 'column' }} alignItems={'center'} spacing={4}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'background.muted',
                borderRadius: '16px',
                display: 'flex',
                gap: 3,
                justifyContent: { md: 'start', xs: 'space-between' },
                pl: '16px',
                pr: '10px',
                py: 1,
                width: { md: 'auto', xs: '100%' },
              }}
            >
              <Typography variant="body2">npm install react-chatbotify</Typography>
              <Button
                component={motion.button}
                whileHover={{ boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', y: -2 }}
                transition={{ damping: 20, stiffness: 300, type: 'spring' }}
                variant="contained"
                onClick={handleCopy}
                sx={{ borderRadius: '10px', textTransform: 'none' }}
              >
                {t('hero_section.copy_text')}
              </Button>
            </Box>
            {!loading && (
              <Box sx={{ display: 'flex', gap: 4, pl: { md: 2, xs: 0 } }}>
                {[
                  { count: stars, text: t('hero_section.star_text'), url: `${repoUrl}/stargazers` },
                  { count: forks, text: t('hero_section.fork_text'), url: `${repoUrl}/forks` },
                ].map((item, idx) => (
                  <Box
                    key={idx}
                    component={motion.div}
                    whileHover={{ boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', y: -2 }}
                    transition={{ damping: 20, stiffness: 300, type: 'spring' }}
                    onClick={() => window.open(item.url, '_blank')}
                    sx={{
                      alignItems: 'center',
                      backgroundColor: 'background.paper',
                      borderRadius: 2,
                      cursor: 'pointer',
                      display: 'flex',
                      gap: 1,
                      px: 2,
                      py: 1,
                    }}
                  >
                    <FaGithub size={20} />
                    <Typography variant="body2">
                      {item.text} {item.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Stack>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {link_buttons.map((link, idx) => (
              <Link
                key={idx}
                component={motion.a}
                whileHover={{ scale: 1.02, textDecoration: 'underline' }}
                transition={{ duration: 0.2 }}
                sx={{ alignItems: 'center', display: 'flex', gap: 1 }}
                href={link.url}
                target="_blank"
              >
                {link.text} <ArrowRight size={16} />
              </Link>
            ))}
          </Box>
        </motion.div>
      </motion.div>

      {/* Right Column: ChatBot */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: { lg: 450, xs: 'auto' },
          justifyContent: 'center',
          mb: { lg: 0, xs: 2 },
          mt: { lg: 0, xs: 4 },
          position: 'relative',
          width: { lg: 'auto', xs: '100%' },
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {isDesktop ? (
            <ChatBot
              flow={flow}
              plugins={plugins}
              settings={{
                botBubble: { simulateStream: true },
                chatHistory: { disabled: true },
                general: { embedded: true },
              }}
            />
          ) : (
            <Box sx={{ width: '88vw', maxHeight: '60vh' }}>
              <ChatBot
                flow={flow}
                plugins={plugins}
                settings={{
                  botBubble: { simulateStream: true },
                  chatHistory: { disabled: true },
                  general: { embedded: true },
                }}
                styles={{
                  chatWindowStyle: {
                    width: '100%',
                    height: '60vh',
                  },
                }}
              />
            </Box>
          )}
        </motion.div>
      </Box>

      {/* Scroll-down Cue */}
      {isDesktop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          style={{
            alignItems: 'center',
            bottom: -90,
            display: 'flex',
            flexDirection: 'column',
            left: '50%',
            position: 'absolute',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          {[0.15, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 1, 0.6] }}
              transition={{
                delay: 1 + delay,
                duration: 1.8,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <ChevronDown size={28} color="#444" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Box>
  );
};

export default HeroSection;
