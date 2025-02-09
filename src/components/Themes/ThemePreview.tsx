import GalleryTooltip from "@/components/GalleryTooltip/GalleryTooltip";
import useIsDesktop from "@/hooks/useIsDesktop";
import { Box, Button, Typography } from "@mui/material";
import { Download, Paintbrush, Trash } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import ChatBot, { Params } from "react-chatbotify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatPreviewIdToTitleCase } from "../../utils";

/**
 * Preview panel for users to view the output of selected theme(s).
 * 
 * @param previewIds array of theme ids to show in preview
 * @param setPreviewIds handles logic for updating themes shown
 */
const ThemePreview: React.FC<{
  previewIds: string[];
  setPreviewIds: Dispatch<SetStateAction<string[]>>;
}> = ({
  previewIds,
  setPreviewIds
}) => {
  // lazy loads translations
  const { t } = useTranslation("components/themes");

  const isDesktop = useIsDesktop();

  const navigate = useNavigate();

  const flow = {
    start: {
      message: (params: Params) => {
        params.injectMessage("Hello 👋! Did you know? The order of specifying themes matters!");
        return "Try previewing some themes below, or click on those on the left! 😊";
      },
      checkboxes: { items: ["Minimal Midnight", "Cyborg", "Terminal"] },
      function: (params: Params) => {
        setPreviewIds(
          params.userInput.split(",").map((theme: string) => {
            if (theme === "Minimal Midnight") return "minimal_midnight";
            if (theme === "Cyborg") return "cyborg";
            return "terminal";
          })
        );
      },
      chatDisabled: true,
      path: "end",
    },
    end: {
      message: "What's next? 😊",
      options: ["Try Again", "Check Documentation", "Discord"],
      path: (params: Params) => {
        if (params.userInput === "Try Again") setPreviewIds([]);
        else if (params.userInput === "Discord") window.open("https://discord.gg/6R4DK4G5Zh");
        else if (params.userInput === "Check Documentation") window.open("https://react-chatbotify.com");
        else {
          setPreviewIds([]);
          params.injectMessage("Hmmm I'm not sure what you said, but let's try again!");
        }
        return "start";
      },
    },
  };

  const handleRemoveSelectionClick = (previewIdToRemove: string) => {
    const filteredPreviewIds = previewIds.filter((previewId) => previewId !== previewIdToRemove);
    setPreviewIds(filteredPreviewIds);
  };

  const iconButtonStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background.secondaryBtn',
    color: 'text.secondaryBtn',
    minWidth: 'auto',
    padding: 0,
    textTransform: 'none',
    lineHeight: '1.2',
    ':hover': {
      backgroundColor: 'background.secondaryBtnHover',
      color: 'text.secondaryBtnHover'
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'default'
    }
  } as const;

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#f9fafb',
        boxSizing: 'border-box',
        borderLeft: "2px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          mb: 2,
          mt: 6,
          ml: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            {t("theme_preview.preview")}
          </Typography>
          <Typography color="text.secondary">
            {t("theme_preview.num_themes_selected").replaceAll("{num_themes_selected}", previewIds.length.toString())}
          </Typography>
        </Box>

        {/* Three Buttons on the far right side with tooltips */}
        <Box sx={{ display: 'flex', gap: 1, mr: 6 }}>
          {/* Reset theme selections (Trash icon) */}
          <GalleryTooltip content={t("theme_preview.reset_selected_themes")} placement="top">
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
          <GalleryTooltip content={t("theme_preview.download_theme_bundle")} placement="top">
            <span>
              <Button
                aria-label="download theme bundle"
                disabled={previewIds.length === 0}
                sx={iconButtonStyles}
              >
                <Download size={20} color="currentColor" />
              </Button>
            </span>
          </GalleryTooltip>

          {/* Edit themes in theme builder (Paintbrush icon) */}
          <GalleryTooltip content={t("theme_preview.edit_in_theme_builder")} placement="top">
            <span>
              <Button
                aria-label="edit themes in theme builder"
                disabled={previewIds.length === 0}
                sx={iconButtonStyles}
                onClick={() => navigate("/theme-builder")}
              >
                <Paintbrush size={20} color="currentColor" />
              </Button>
            </span>
          </GalleryTooltip>
        </Box>
      </Box>

      {/* ChatBot */}
      <Box sx={{ width: '100%', mb: 4 }}>
        <ChatBot
          flow={flow}
          themes={previewIds.map((themeId) => ({ id: themeId }))}
          settings={{ general: { embedded: true } }}
          styles={{ chatWindowStyle: { height: "54vh", width: isDesktop ? "24vw" : "80vw" } }}
        />
      </Box>

      {/* Selected Themes */}
      <Box
        sx={{
          width: '100%',
          mt: 0.5,
          maxHeight: '300px',
          overflowY: 'auto'
        }}
      >
        {previewIds.length === 0 ? (
          <Typography
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              fontSize: '1.125rem',
              textAlign: 'center',
              my: 2
            }}
          >
            {t("theme_preview.select_themes_to_preview")}
          </Typography>
        ) : (
          previewIds.map((previewId) => {
            const previewTitle = formatPreviewIdToTitleCase(previewId);
            return (
              <Box
                key={previewId}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  my: 1,
                  mx: 3
                }}
              >
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    fontSize: '1.125rem'
                  }}
                >
                  {previewTitle}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                    cursor: 'pointer',
                    ':hover': { color: '#2563eb' }
                  }}
                >
                  <Button
                    onClick={() => handleRemoveSelectionClick(previewId)}
                    sx={{
                      fontWeight: 600,
                      mr: '3px',
                      textTransform: 'none',
                      p: 0,
                      minWidth: 'auto',
                      color: 'inherit',
                      lineHeight: '1.2'
                    }}
                  >
                    {t("theme_preview.remove_selection")}
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
