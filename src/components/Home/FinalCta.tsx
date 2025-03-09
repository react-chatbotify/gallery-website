import { Box, Button, Grid, Typography } from "@mui/material";

export default function FinalCta(): JSX.Element {
  return (
    <Box display="flex" justifyContent="center">
      <Grid container gap={3} direction="column" sx={{ width: { md: "min-content", sm: "auto" } }} alignItems="center" wrap="nowrap">
        <Grid item>
          <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ whiteSpace: { md: "nowrap", sm: "normal" } }}>
            Ready to build your own chatbot?
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" textAlign="center">
            Jump straight into our “Get started” guide or play around in our playground where there are no rules!
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" spacing={2} wrap="wrap">
          <Grid item>
            <Button sx={{ borderRadius: '12px', textTransform: "capitalize" }} variant="contained" color="primary">
              Get started
            </Button>
          </Grid>
          <Grid item>
            <Button sx={{ borderRadius: '12px', textTransform: "capitalize", backgroundColor: "background.muted", color: "text.muted" }} variant="contained" color="secondary">
              Visit the playground
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
