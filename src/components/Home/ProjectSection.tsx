import { Box, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useFetchGitHubRepoInfo from '@/hooks/useFetchGitHubRepoInfo';
import useSeamlessScroll from '@/hooks/useSeamlessScroll';

import coreLibraryPreview from '../../assets/images/LandingPage/ProjectPreviews/core_library.webp';
import discordBotPreview from '../../assets/images/LandingPage/ProjectPreviews/discord_bot.webp';
import documentationPreview from '../../assets/images/LandingPage/ProjectPreviews/documentation.webp';
import galleryApiPreview from '../../assets/images/LandingPage/ProjectPreviews/gallery_api.webp';
import galleryWebsitePreview from '../../assets/images/LandingPage/ProjectPreviews/gallery_website.webp';
import FadeInOnView from '../FadeComponent/FadeInOnView';
import { HeadingAndDescription } from './FeaturesAndBenefitsSection';
import ProjectCard from './ProjectCard';

/**
 * Shows the list of contributors for each project repository that helped make the overall project possible.
 */
export const ProjectSection = (): JSX.Element => {
  // lazy loads translations
  const { t } = useTranslation('components/home');

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gradientColor = isDark ? '9,9,11' : '237,237,237';

  // fetch GitHub repo information
  const coreLibraryProject = useFetchGitHubRepoInfo('Core Library', 'tjtanjin/react-chatbotify');
  const galleryWebsiteProject = useFetchGitHubRepoInfo('Gallery Website', 'React-ChatBotify/gallery-website');
  const galleryApiProject = useFetchGitHubRepoInfo('Gallery API', 'React-ChatBotify/gallery-api');
  const documentationProject = useFetchGitHubRepoInfo('Documentation', 'React-ChatBotify/core-library-documentation');
  const discordBotProject = useFetchGitHubRepoInfo('Discord Bot', 'React-ChatBotify/discord-bot');

  // combine fetched data with i18n metadata
  const projects = useMemo(() => {
    return [
      { ...coreLibraryProject, previewImg: coreLibraryPreview },
      { ...galleryWebsiteProject, previewImg: galleryWebsitePreview },
      { ...galleryApiProject, previewImg: galleryApiPreview },
      { ...documentationProject, previewImg: documentationPreview },
      { ...discordBotProject, previewImg: discordBotPreview },
    ];
  }, [coreLibraryProject, galleryWebsiteProject, galleryApiProject, documentationProject, discordBotProject]);

  // create duplicated array for infinite scroll effect
  const loopedProjects = useMemo(() => {
    // triple the projects for smoother infinite scroll
    return [...projects, ...projects, ...projects];
  }, [projects]);

  // initialize seamless scroll hook
  // note: speed value 0.05 and below seems to break on mobile
  const scrollSpeed = 0.06;
  const { containerRef, handlers } = useSeamlessScroll(scrollSpeed, loopedProjects.length);

  // generate unique keys for each card
  const generateKey = useCallback(
    (index: number, projectName: string) => {
      const loopIndex = Math.floor(index / projects.length);
      const projectIndex = index % projects.length;
      return `${projectName}-${loopIndex}-${projectIndex}`;
    },
    [projects.length]
  );

  return (
    <Box sx={{ display: 'grid', gap: 6 }}>
      {/* Section Header */}
      <FadeInOnView>
        <HeadingAndDescription heading={t('project_section.title')} description={t('project_section.heading.1')} />
      </FadeInOnView>

      {/* Scrolling Container with Fixed Gradients */}
      <Box
        sx={{
          '&:after': {
            background: `linear-gradient(270deg, rgba(${gradientColor},1) 0%, rgba(${gradientColor},0.8) 60%, transparent 100%)`,
            right: 0,
          },
          '&:before': {
            background: `linear-gradient(90deg, rgba(${gradientColor},1) 0%, rgba(${gradientColor},0.8) 60%, transparent 100%)`,
            left: 0,
          },
          '&:before, &:after': {
            bottom: 0,
            content: '""',
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            width: '60px',
            zIndex: 2,
          },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={containerRef}
          {...handlers}
          sx={{
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              width: 'fit-content',
              willChange: 'transform',
            }}
          >
            {loopedProjects.map((project, index) => (
              <Box key={generateKey(index, project.name)}>
                <ProjectCard {...project} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectSection;
