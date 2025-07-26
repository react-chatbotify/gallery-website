import { Box, Grid, Grid2, Link, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import React from 'react';

import { Endpoints } from '@/constants/Endpoints';

const Steps: React.FC = () => {
  return (
    <Box mt={8}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '60px',
          letterSpacing: '-0.75%',
          lineHeight: 1.2,
          color: '#F8FAFC',
          textAlign: 'center',
          justifySelf: 'center',
        }}
      >
        Steps to becoming a sponsor
      </Typography>
      <Typography
        mt={2}
        sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: 1.75,
          color: '#A7AFB8',
          textAlign: 'center',
          justifySelf: 'center',
          maxWidth: {
            md: 600,
          },
        }}
      >
        We prefer to talk directly with each of our potential sponsor as we hope that our core values align and that we
        are truly a fitting match.
      </Typography>
      <Grid2 container spacing={1} sx={{ justifySelf: 'center', mt: 8 }}>
        <Grid
          item
          xl={3}
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: {
              md: '400px',
            },
          }}
        >
          <Typography
            sx={{
              opacity: 0.5,
              fontWeight: 600,
              color: '#A7AFB8',
              lineHeight: '100%',
              textAlign: 'center',
              fontSize: '32px',
              justifyContent: 'center',
            }}
          >
            01
          </Typography>
          <Typography sx={{ fontSize: '18px', lineHeight: 1.5, textAlign: 'center', fontWeight: 600 }}>
            Send us a message on our Discord server
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 400, color: '#A7AFB8', lineHeight: 1.75, textAlign: 'center', mt: 2 }}
          >
            We are active on our Discord and it’s the best way to stay in touch with us and follow our work.
          </Typography>
          <Box>
            <Link target="_blank" rel="noopener noreferrer" href={Endpoints.projectCoreDiscordUrl} underline="none">
              Join our Discord
              <ArrowRight size={16} style={{ marginLeft: '5px' }} />
            </Link>
          </Box>
        </Grid>
        <Grid item xl={3} sx={{ justifyContent: 'center', maxWidth: { md: '400px' } }}>
          <Typography
            sx={{
              opacity: 0.5,
              fontWeight: 600,
              color: '#A7AFB8',
              lineHeight: '100%',
              textAlign: 'center',
              fontSize: '32px',
              justifyContent: 'center',
            }}
          >
            02
          </Typography>
          <Typography sx={{ fontSize: '18px', lineHeight: 1.5, textAlign: 'center', fontWeight: 600 }}>
            Apply as a sponsor by filling out a form
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 400, color: '#A7AFB8', lineHeight: 1.75, textAlign: 'center', mt: 2 }}
          >
            If our preliminary chat goes well according to both you and us, we’ll give you a link to a form that you can
            fill out.
          </Typography>
        </Grid>
        <Grid item xl={3} sx={{ justifyContent: 'center', maxWidth: { md: '400px' } }}>
          <Typography
            sx={{
              opacity: 0.5,
              fontWeight: 600,
              color: '#A7AFB8',
              lineHeight: '100%',
              textAlign: 'center',
              fontSize: '32px',
              justifyContent: 'center',
            }}
          >
            03
          </Typography>
          <Typography sx={{ fontSize: '18px', lineHeight: 1.5, textAlign: 'center', fontWeight: 600 }}>
            Wait for confirmation (and our huge thanks!)
          </Typography>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 400, color: '#A7AFB8', lineHeight: 1.75, textAlign: 'center', mt: 2 }}
          >
            We will contact you via Discord or email and let you know if everything is in order for the sponsorship.
          </Typography>
        </Grid>
      </Grid2>
    </Box>
  );
};

export default Steps;
