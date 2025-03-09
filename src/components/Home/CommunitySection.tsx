import { GitHub } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { ArrowRight, MessageCircle } from "lucide-react";
import { HeadingAndDescription } from "./FeaturesAndBenefitsSection";

const GenericLinkButton = ({ icon, text, title }: { icon: React.ReactNode; text: string; title: string }) => (
  <Button fullWidth sx={buttonStyles}>
    <Box sx={contentBoxStyles}>
      {icon}
      <Box sx={textBoxStyles}>
        <Typography fontWeight="bold">{title}</Typography>
        <Typography color="text.muted">{text}</Typography>
      </Box>
    </Box>
    <ArrowRight size={22} style={{ color: "text.muted" }} />
  </Button>
);

export default function CommunitySection() {
  return (
    <Box sx={{ display: "grid", gap: 6, mx: "auto" }}>
      <HeadingAndDescription
        heading="Our community"
        description="Whether you’re submitting a new theme, improving existing plugins, or contributing code, 
        your input helps us grow. Join the community, we welcome everyone with open arms. 
        Just remember to be respectful: we are all humans after all."
      />
      <Box sx={linkContainerStyles}>
        <GenericLinkButton
          icon={<MessageCircle size={26} />}
          title="Join our Discord"
          text="Reach out to us via Discord and stay in touch with the latest updates and community news!"
        />
        <GenericLinkButton
          icon={<GitHub sx={{ fontSize: 26 }} />}
          title="Visit our GitHub"
          text="Go straight to the (open) source and see what we are up to on the code side of things."
        />
      </Box>
    </Box>
  );
}

// Styles
const buttonStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 2,
  px: 3,
  borderRadius: "12px",
  border: "1px solid",
  borderColor: "background.muted",
  textTransform: "none",
  color: "text.primary",
};

const contentBoxStyles = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: { xs: "start", md: "center" },
  gap: 3,
};

const textBoxStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  textAlign: "start",
};

const linkContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  p: 4,
};
