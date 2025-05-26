import { Box, Card, CardContent, CardMedia, Chip, Link, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub'; // Assuming GitHubIcon is available
import React from 'react';
import { useTranslation } from 'react-i18next';

import useIsDesktop from '@/hooks/useIsDesktop'; // Assuming this hook exists and is appropriate

import { TeamMember } from '../../interfaces/TeamMember';

/**
 * Props for the TeamMemberCard component.
 */
interface TeamMemberCardProps {
  /**
   * The team member data to display.
   */
  member: TeamMember;
}

/**
 * Card component to display information about a team member.
 * It shows the member's avatar, name, GitHub profile link, and roles.
 */
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { t } = useTranslation('components/team');
  const isDesktop = useIsDesktop();

  const cardHeight = isDesktop ? 420 : 380; // Adjusted height slightly from PluginCard
  const avatarSize = isDesktop ? 180 : 140; // Adjusted avatar size

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
        width: isDesktop ? '100%' : '85vw', // Same width behavior as PluginCard
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: avatarSize, mb: 1 }}>
        {member.avatarUrl ? (
          <CardMedia
            component="img"
            image={member.avatarUrl}
            alt={member.name}
            sx={{
              borderRadius: '50%', // Circular avatar
              height: avatarSize,
              width: avatarSize,
              objectFit: 'cover',
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              // Fallback to icon if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
              // Ideally, we'd render the icon here, but CardMedia doesn't easily allow a child fallback
              // For now, we'll rely on the AccountCircleIcon rendered below if avatarUrl is missing.
              // A more robust solution might involve a state variable to toggle between img and icon.
            }}
          />
        ) : (
          <AccountCircleIcon sx={{ fontSize: avatarSize, color: 'text.secondary' }} />
        )}
      </Box>
      <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 1 }}>
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
          <Typography variant="body2">
            {t('team_member_card.github_profile', 'GitHub')}
          </Typography>
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 0.5,
            mt: 1,
            maxHeight: isDesktop ? 80 : 60, // Max height for roles container
            overflowY: 'auto', // Scroll if many roles
          }}
        >
          {member.roles.map((role) => (
            <Chip label={role} key={role} size="small" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
