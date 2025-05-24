import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function FinalCta(): JSX.Element {
  const { t } = useTranslation('components/home');
  return (
    <Box display="flex" justifyContent="center">
      <Grid
        container
        gap={3}
        direction="column"
        sx={{ width: { md: 'min-content', sm: 'auto' } }}
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ whiteSpace: { md: 'nowrap', sm: 'normal' } }}
          >
            {t('final_cta.title')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" textAlign="center">
            {t('final_cta.heading.1')}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" spacing={2} wrap="wrap">
          <Grid item>
            <Button sx={{ borderRadius: '12px', textTransform: 'capitalize' }} variant="contained" color="primary">
              {t('final_cta.primaryButton')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                backgroundColor: 'background.muted',
                borderRadius: '12px',
                color: 'text.muted',
                textTransform: 'capitalize',
              }}
              variant="contained"
              color="secondary"
            >
              {t('final_cta.secondaryButton')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
