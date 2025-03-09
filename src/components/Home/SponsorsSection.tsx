import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { PiggyBank } from "lucide-react";
import { HeadingAndDescription } from "./FeaturesAndBenefitsSection";

const sponsors = [
  "Laura Lemon", "Pete Pineapple",
  "Johnny Jackfruit", "Courtney Cucumber",
  "Gary Grape", "Monica Mango",
  "Sally Strawberry", "Zach Zucchini",
  "Rory Rhubarb", "Tanya Tangerine",
];

const SponsorCard = () => {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        px: "25px",
        py: "25px",
        display: "flex",
        gap: "16px",
        flex: 1,
        flexDirection: "column",
        border: "1px solid white",
        borderColor: "background.muted",
      }}
    >
      <PiggyBank size={30} color="white" />
      <div>
        <Typography variant="h6" fontWeight="bold" color="white">
          Want to sponsor us?
        </Typography>
        <Typography variant="body1" color="text.muted">
          We are always looking for more sponsors, be it individuals or
          companies. Every dollar helps and will be used to support this
          project.
        </Typography>
      </div>
      <Link
        href="#"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "primary.main",
          fontSize: "14px",
          fontWeight: "500",
          marginTop: "8px",
          textDecoration: "none",
          ":hover": { textDecoration: "underline" },
        }}
      >
        Contact us →
      </Link>
    </Box>
  );
};

export default function SponsorsSection() {
  return (
    <Box sx={{ display: "grid", gap: 6, mx: "auto" }}>
      <HeadingAndDescription
        heading="Sponsored by these awesome people"
        description="We offer an open-source solution and have lots of contributors but we all know that money runs this world and thus, also our project. This is where these awesome supporters come in and with the help of their generosity, we get to continue our mission."
      />
      <Container maxWidth={false}>
        <Grid container columnSpacing={20} rowSpacing={5} alignItems="center">
          {/* Left Side: names and stuff */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "grid",
                color: "text.muted",
                gap: 3,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              {sponsors.map((row, index) => (
                <Typography key={index} variant="body1">
                  {row}
                </Typography>
              ))}
            </Box>
            <Typography variant="body1" sx={{ fontStyle: "italic", mt: 3 }} color="gray">
              And <strong>14</strong> other amazing human beings who didn’t want to disclose their names in public. <strong>We thank you all!</strong>
            </Typography>
          </Grid>

          {/* Right Side: CTA */}
          <Grid item xs={12} md={7}>
            <SponsorCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
