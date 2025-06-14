import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import FadeInOnView from '@/components/FadeComponent/FadeInOnView';
import MaybeYouCard from '@/components/OurTeam/MaybeYouCard';
import TeamMemberCard from '@/components/OurTeam/TeamMemberCard';
import { maybeYouCardData, teamMembers } from '@/constants/TeamData';

/**
 * OurTeam page component.
 * Displays information about the team members and a call to action to contribute.
 */
const OurTeam: React.FC = () => {
  const { t } = useTranslation('pages/ourteam');

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        py: 4, // Overall page padding top and bottom
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        {/* Title and Introduction Section */}
        <Box
          sx={{
            mb: 4, // Margin bottom for spacing before the grid
            mt: { lg: 0, md: 5, sm: 5, xl: 0, xs: 5 }, // Consistent with Plugins.tsx
            textAlign: 'center', // Center align title and intro
          }}
        >
          <FadeInOnView>
            <Typography variant="h3" fontWeight="bold" color="text.primary" mb={2}>
              {t('teams_page.title', 'Meet Our Team')}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', margin: '0 auto' }}>
              {t(
                'teams_page.introduction',
                "We're a passionate group of developers, designers, and enthusiasts dedicated to building an amazing open-source platform. Get to know the people behind the project."
              )}
            </Typography>
          </FadeInOnView>
        </Box>

        {/* Spacer - optional, can adjust or remove */}
        <Box sx={{ height: { sm: '64px', xs: '32px' } }} />

        {/* Team Members and "Maybe You!" Card Grid */}
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item key={member.id} xs={12} sm={6} md={4} lg={3}>
              <FadeInOnView delay={index * 0.1}>
                <TeamMemberCard member={member} />
              </FadeInOnView>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FadeInOnView delay={teamMembers.length * 0.1}>
              <MaybeYouCard
                title={t(maybeYouCardData.titleKey, 'Want to Join Us?')}
                text={t(
                  maybeYouCardData.textKey,
                  "We're always looking for passionate individuals to contribute. Check out our contribution guidelines!"
                )}
              />
            </FadeInOnView>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OurTeam;
