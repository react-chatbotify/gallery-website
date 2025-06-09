import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Card, CardContent, CardMedia, Chip, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsDesktop from '@/hooks/useIsDesktop';

import { Role as RoleType, TeamMember } from '../../interfaces/TeamMember';

/**
 * Props for the TeamMemberCard component.
 */
type TeamMemberCardProps = {
  /**
   * The team member data to display.
   */
  member: TeamMember;
};

/**
 * Card component to display information about a team member.
 * Roles are displayed as two-line chips if a project is associated,
 * with a focus on improved aesthetics and centered layout on mobile.
 *
 * @param member member to show info for
 */
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { t } = useTranslation('components/our-team');
  const isDesktop = useIsDesktop();

  const cardHeight = isDesktop ? 420 : 380;
  const avatarSize = isDesktop ? 180 : 140;

  return (
    <Card
      sx={{
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        height: cardHeight,
        p: 2,
        width: isDesktop ? '100%' : '85vw',
        justifyContent: 'space-between',
        mx: isDesktop ? undefined : 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: avatarSize, mb: 1 }}>
        {member.avatarUrl ? (
          <CardMedia
            component="img"
            image={member.avatarUrl}
            alt={member.name}
            sx={{
              borderRadius: '50%',
              height: avatarSize,
              width: avatarSize,
              objectFit: 'cover',
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <AccountCircleIcon sx={{ fontSize: avatarSize, color: 'text.secondary' }} />
        )}
      </Box>
      <CardContent
        sx={{
          textAlign: 'center',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {member.name}
        </Typography>
        <Link
          href={member.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              color: 'primary.main',
            },
            mb: 1,
          }}
        >
          <GitHubIcon sx={{ fontSize: 20 }} />
          <Typography variant="body2">{t('team_member_card.github_profile', 'GitHub')}</Typography>
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            mt: 1.5,
            maxHeight: isDesktop ? 90 : 70,
            overflowY: 'auto',
            px: 0.5,
          }}
        >
          {member.roles.map((role: RoleType, index: number) => {
            const chipKey = `${member.id}-role-${role.name}-${role.project || 'global'}-${index}`;

            return (
              <Chip
                key={chipKey}
                label={
                  <Box
                    onClick={role.link ? () => window.open(role.link) : undefined}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: role.link ? 'pointer' : 'default',
                    }}
                  >
                    {role.project ? (
                      <>
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{
                            lineHeight: 1.2,
                            fontSize: '0.68rem',
                            color: 'text.secondary',
                            fontWeight: 500,
                            whiteSpace: 'normal',
                            textAlign: 'center',
                          }}
                        >
                          {role.project}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            lineHeight: 1.25,
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            color: 'text.primary',
                            whiteSpace: 'normal',
                            textAlign: 'center',
                            mt: '1px',
                          }}
                        >
                          {role.name}
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          lineHeight: 1.3,
                          fontWeight: 600,
                          fontSize: '0.825rem',
                          color: 'text.primary',
                          whiteSpace: 'normal',
                          textAlign: 'center',
                        }}
                      >
                        {role.name}
                      </Typography>
                    )}
                  </Box>
                }
                sx={{
                  height: 'auto',
                  minHeight: '38px',
                  borderRadius: '8px',
                  '& .MuiChip-label': {
                    padding: '5px 10px',
                  },
                }}
              />
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
