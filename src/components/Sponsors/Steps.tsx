import { Box, Grid, Grid2, Link, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Endpoints } from '@/constants/Endpoints';

type StepItem = {
  number: string;
  step: string;
  step_description: string;
  link_text?: string;
};

type Steps = {
  [step: string]: StepItem;
};

const Steps: React.FC = () => {
  const { t } = useTranslation('components/steps');

  const steps = t('steps', { returnObjects: true }) as Steps;

  const sortedSteps = Object.keys(steps).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return (
    <Box mt={8}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '60px',
          letterSpacing: '-0.75%',
          lineHeight: 1.2,
          color: 'accent.50',
          textAlign: 'center',
          justifySelf: 'center',
        }}
      >
        {t('heading')}
      </Typography>
      <Typography
        mt={2}
        sx={{
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: 1.75,
          color: 'text.tertiary',
          textAlign: 'center',
          justifySelf: 'center',
          maxWidth: {
            md: 600,
          },
        }}
      >
        {t('description')}
      </Typography>
      <Grid2 container spacing={1} sx={{ justifySelf: 'center', mt: 8 }}>
        {sortedSteps.map((step) => (
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
            key={steps[step].number}
          >
            <Typography
              sx={{
                opacity: 0.5,
                fontWeight: 600,
                color: 'text.tertiary',
                lineHeight: '100%',
                textAlign: 'center',
                fontSize: '32px',
                justifyContent: 'center',
              }}
            >
              {steps[step].number}
            </Typography>
            <Typography sx={{ fontSize: '18px', lineHeight: 1.5, textAlign: 'center', fontWeight: 600 }}>
              {steps[step].step}
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                color: 'text.tertiary',
                lineHeight: 1.75,
                textAlign: 'center',
                mt: 2,
              }}
            >
              {steps[step].step_description}
            </Typography>
            {steps[step].link_text ? (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={Endpoints.projectCoreDiscordUrl}
                underline="none"
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifySelf: 'center' }}
              >
                <Typography sx={{ marginRight: '5px' }}>{steps[step].link_text}</Typography>
                <ArrowRight size={16} />
              </Link>
            ) : null}
          </Grid>
        ))}
      </Grid2>
    </Box>
  );
};

export default Steps;
