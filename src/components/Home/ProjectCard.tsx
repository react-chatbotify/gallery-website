import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { RepositoryInfo } from '@/interfaces/repository/RepositoryInfo';

import FadeInOnView from '../FadeComponent/FadeInOnView';

/**
 * ProjectCard displays a GitHub repository’s basic info in a styled card.
 *
 * @param name repository display name
 * @param description repository description text
 * @param repoUrl URL of the GitHub repository
 * @param contributors array of contributor objects (avatar_url, html_url, login)
 * @param previewImg URL of the preview image to show
 * @param loading whether data is still loading (shows placeholders when true)
 */
const ProjectCard: React.FC<RepositoryInfo & { previewImg: string }> = React.memo(
  ({ name, description, repoUrl, contributors, previewImg, loading }) => {
    // lazy loads translations
    const { t } = useTranslation('components/home');

    // show up to 10 avatars, then a “+N” overflow indicator
    const displayAvatars = contributors.slice(0, 10);
    const extraCount = Math.max(0, contributors.length - displayAvatars.length);

    return (
      <FadeInOnView>
        <Card sx={cardStyles}>
          {/* Repository preview image */}
          <Box sx={imageWrapperStyles}>
            <CardMedia sx={imageStyles} image={previewImg} />
          </Box>

          <CardContent sx={cardContentStyles}>
            {/* Repository name */}
            <Typography
              fontWeight="bold"
              variant="h6"
              sx={{
                minHeight: '32px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Typography>

            {/* Repository description (two-line clamp) */}
            <Typography
              color="text.muted"
              variant="body1"
              sx={{
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                display: '-webkit-box',
                lineHeight: 1.5,
                minHeight: '48px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {description}
            </Typography>

            {/* Contributor avatars or placeholders */}
            <AvatarGroup
              max={11}
              sx={{
                flexDirection: 'row',
                justifyContent: 'start',
                minHeight: '30px',
                my: 2,
              }}
            >
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <Avatar key={i} sx={avatarStyles} />)
              ) : (
                <>
                  {displayAvatars.map((c) => (
                    <MuiLink key={c.login} href={c.html_url} target="_blank" rel="noopener noreferrer">
                      <Avatar sx={avatarStyles} src={`${c.avatar_url}&s=32`} alt={c.login} />
                    </MuiLink>
                  ))}
                  {extraCount > 0 && (
                    <MuiLink href={`${repoUrl}/graphs/contributors`} target="_blank" rel="noopener noreferrer">
                      <Avatar sx={avatarStyles}>+{extraCount}</Avatar>
                    </MuiLink>
                  )}
                </>
              )}
            </AvatarGroup>

            {/* Bottom section: GitHub button and read-more */}
            <Box sx={bottomSectionStyles}>
              <Button component={MuiLink} href={repoUrl} target="_blank" rel="noopener" sx={githubButtonStyles}>
                {loading ? '…' : t('project_section.view_in_github')}
              </Button>
              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <Typography
                  sx={{
                    color: 'text.muted',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {loading
                    ? ''
                    : t('project_section.contribution_sub_heading', {
                        count: contributors.length,
                      })}
                </Typography>
                <Button component={MuiLink} href={repoUrl} target="_blank" rel="noopener" sx={readMoreLinkStyles}>
                  {t('project_section.read_more')} <ArrowRight size={16} />
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </FadeInOnView>
    );
  }
);

// Styles
const avatarStyles = {
  height: 30,
  width: 30,
};

const cardStyles = {
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'background.muted',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '540px',
};

const imageWrapperStyles = {
  borderRadius: '17px',
  flex: '0 0 200px',
  mt: 4,
  mx: 4,
  overflow: 'hidden',
};

const imageStyles = {
  border: '1px solid white',
  borderBottom: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderColor: 'background.muted',
  borderRadius: '17px',
  boxShadow: '0px 0px 50px 0px #5E5E5E0F',
  height: 200,
  mx: 2,
  objectFit: 'cover',
};

const cardContentStyles = {
  backgroundColor: 'background.paper',
  boxSizing: 'border-box',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: 2,
  overflow: 'hidden',
  px: 3,
  py: 5,
  width: '100%',
};

const bottomSectionStyles = {
  alignItems: 'flex-start',
  display: 'flex',
  gap: 2,
  mt: 'auto',
};

const githubButtonStyles = {
  backgroundColor: 'background.secondary',
  borderRadius: '12px',
  color: 'text.primary',
  display: { md: 'block', xs: 'none' },
  flexShrink: 0,
  p: '13px 24px',
  textTransform: 'capitalize',
};

const readMoreLinkStyles = {
  alignItems: 'center',
  display: 'flex',
  flexFlow: 'row',
  gap: 1,
  whiteSpace: 'nowrap',
};

export default ProjectCard;
