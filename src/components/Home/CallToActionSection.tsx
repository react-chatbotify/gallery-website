import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/images/logo.webp';
import { Endpoints } from '@/constants/Endpoints';

import FadeInOnView from '../FadeComponent/FadeInOnView';

/**
 * CallToActionSection renders a centered section encouraging users to get started.
 */
const CallToActionSection = (): JSX.Element => {
  // lazy loads translations
  const { t } = useTranslation('components/home');

  return (
    <FadeInOnView>
      <Box display="flex" justifyContent="center">
        <Grid
          container
          gap={3}
          direction="column"
          sx={{ width: { md: 'min-content', sm: 'auto' } }}
          alignItems="center"
          wrap="nowrap"
        >
          {/* Project logo */}
          <Grid item>
            <Box
              component="img"
              src={logo}
              alt={t('call_to_action_section.logo_alt')}
              sx={{ height: 128, width: 128 }}
            />
          </Grid>

          {/* Section title */}
          <Grid item>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{ whiteSpace: { md: 'nowrap', sm: 'normal' } }}
            >
              {t('call_to_action_section.title')}
            </Typography>
          </Grid>

          {/* Section subtitle */}
          <Grid item>
            <Typography variant="body1" textAlign="center">
              {t('call_to_action_section.heading.1')}
            </Typography>
          </Grid>

          {/* Action buttons */}
          <Grid item container justifyContent="center" spacing={2} wrap="wrap">
            <Grid item>
              <Button
                href={Endpoints.projectQuickStartUrl}
                target="_blank"
                sx={{ borderRadius: '12px', textTransform: 'capitalize' }}
                variant="contained"
                color="primary"
              >
                {t('call_to_action_section.primary_button')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                href={Endpoints.projectPlaygroundUrl}
                target="_blank"
                sx={{
                  backgroundColor: 'background.muted',
                  borderRadius: '12px',
                  color: 'text.muted',
                  textTransform: 'capitalize',
                }}
                variant="contained"
                color="secondary"
              >
                {t('call_to_action_section.secondary_button')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </FadeInOnView>
  );
};

export default CallToActionSection;
