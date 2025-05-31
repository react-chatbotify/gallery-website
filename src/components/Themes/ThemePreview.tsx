import { Box, Button, Typography } from '@mui/material';
import { Download, Paintbrush, Trash } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import ChatBot, { Params } from 'react-chatbotify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GalleryTooltip from '@/components/GalleryTooltip/GalleryTooltip';
import { Endpoints } from '@/constants/Endpoints';
import useIsDesktop from '@/hooks/useIsDesktop';

import { formatPreviewIdToTitleCase } from '../../utils';

/**
 * Preview panel for users to view the output of selected theme(s).
 *
 * @param previewIds array of theme ids to show in preview
 * @param setPreviewIds handles logic for updating themes shown
 */
const ThemePreview: React.FC<{
  previewIds: string[];
  setPreviewIds: Dispatch<SetStateAction<string[]>>;
}> = ({ previewIds, setPreviewIds }) => {
  // lazy loads translations
  const { t } = useTranslation('components/themes');

  const isDesktop = useIsDesktop();

  const navigate = useNavigate();

  const flow = {
    end: {
      message: "What's next? 😊",
      options: ['Try Again', 'Check Documentation', 'Discord'],
      path: async (params: Params) => {
        if (params.userInput === 'Try Again') {
          setPreviewIds([]);
        } else if (params.userInput === 'Discord') {
          window.open(Endpoints.projectCoreDiscordUrl);
        } else if (params.userInput === 'Check Documentation') {
          window.open(Endpoints.projectBaseUrl);
        } else {
          setPreviewIds([]);
          await params.injectMessage("Hmmm I'm not sure what you said, but let's try again!");
        }
        return 'start';
      },
    },
    start: {
      chatDisabled: true,
      message: async (params: Params) => {
        await params.injectMessage('Hello 👋! Did you know? The order of specifying themes matters!');
        return 'Try previewing some themes below, or click on those on the left! 😊';
      },
      checkboxes: { items: ['Minimal Midnight', 'Cyborg', 'Terminal'] },
      function: (params: Params) => {
        setPreviewIds(
          params.userInput.split(',').map((theme: string) => {
            if (theme === 'Minimal Midnight') {
              return 'minimal_midnight';
            }
            if (theme === 'Cyborg') {
              return 'cyborg';
            }
            return 'terminal';
          })
        );
      },
      path: 'end',
    },
  };

  const handleRemoveSelectionClick = (previewIdToRemove: string) => {
    const filteredPreviewIds = previewIds.filter((previewId) => previewId !== previewIdToRemove);
    setPreviewIds(filteredPreviewIds);
  };

  const iconButtonStyles = {
    ':disabled': {
      cursor: 'default',
      opacity: 0.5,
    },
    ':hover': {
      backgroundColor: 'background.secondaryBtnHover',
      color: 'text.secondaryBtnHover',
    },
    alignItems: 'center',
    backgroundColor: 'background.secondaryBtn',
    borderRadius: '8px',
    color: 'text.secondaryBtn',
    display: 'flex',
    height: '40px',
    justifyContent: 'center',
    lineHeight: '1.2',
    minWidth: 'auto',
    padding: 0,
    textTransform: 'none',
    width: '40px',
  } as const;

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.default',
        borderColor: 'divider',
        boxSizing: 'border-box',
        color: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        p: 3,
        pb: 8,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          ml: 6,
          mt: isDesktop ? 12 : 0,
          width: '100%',
        }}
      >
        <Box>
          <Typography variant="h5" color="text.primary" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {t('theme_preview.preview')}
          </Typography>
          <Typography color="text.secondary">
            {t('theme_preview.num_themes_selected').replaceAll('{num_themes_selected}', previewIds.length.toString())}
          </Typography>
        </Box>

        {/* Three Buttons on the far right side with tooltips */}
        <Box sx={{ display: 'flex', gap: 1, mr: 6 }}>
          {/* Reset theme selections (Trash icon) */}
          <GalleryTooltip content={t('theme_preview.reset_selected_themes')} placement="top">
            <span>
              <Button
                aria-label="reset theme selections"
                disabled={previewIds.length === 0}
                sx={iconButtonStyles}
                onClick={() => setPreviewIds([])}
              >
                <Trash size={20} color="currentColor" />
              </Button>
            </span>
          </GalleryTooltip>

          {/* Download theme bundle (Download icon) */}
          <GalleryTooltip content={t('theme_preview.download_theme_bundle')} placement="top">
            <span>
              <Button aria-label="download theme bundle" disabled={previewIds.length === 0} sx={iconButtonStyles}>
                <Download size={20} color="currentColor" />
              </Button>
            </span>
          </GalleryTooltip>

          {/* Edit themes in theme builder (Paintbrush icon) */}
          <GalleryTooltip content={t('theme_preview.edit_in_theme_builder')} placement="top">
            <span>
              <Button
                aria-label="edit themes in theme builder"
                disabled={previewIds.length === 0}
                sx={iconButtonStyles}
                onClick={() => navigate('/theme-builder')}
              >
                <Paintbrush size={20} color="currentColor" />
              </Button>
            </span>
          </GalleryTooltip>
        </Box>
      </Box>

      {/* ChatBot */}
      <Box sx={{ mb: 4, width: '100%' }}>
        <Box sx={{ width: '100%' }}>
          <ChatBot
            flow={flow}
            themes={previewIds.map((themeId) => ({ id: themeId }))}
            settings={{ general: { embedded: true } }}
            styles={{ chatWindowStyle: { height: '54vh', width: isDesktop ? '24vw' : '80vw' } }}
          />
        </Box>
      </Box>

      {/* Selected Themes */}
      <Box
        sx={{
          maxHeight: '300px',
          mt: 0.5,
          width: '100%',
        }}
      >
        {previewIds.length === 0 ? (
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: '1.125rem',
              fontWeight: 600,
              my: 2,
              textAlign: 'center',
            }}
          >
            {t('theme_preview.select_themes_to_preview')}
          </Typography>
        ) : (
          previewIds.map((previewId) => {
            const previewTitle = formatPreviewIdToTitleCase(previewId);
            return (
              <Box
                key={previewId}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mx: 3,
                  my: 1,
                }}
              >
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                >
                  {previewTitle}
                </Typography>
                <Box
                  sx={{
                    ':hover': { color: '#2563eb' },
                    alignItems: 'center',
                    color: 'primary.main',
                    cursor: 'pointer',
                    display: 'flex',
                  }}
                >
                  <Button
                    onClick={() => handleRemoveSelectionClick(previewId)}
                    sx={{
                      color: 'inherit',
                      fontWeight: 600,
                      lineHeight: '1.2',
                      minWidth: 'auto',
                      mr: '3px',
                      p: 0,
                      textTransform: 'none',
                    }}
                  >
                    {t('theme_preview.remove_selection')}
                  </Button>
                  <Trash size={15} color="currentColor" />
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default ThemePreview;
