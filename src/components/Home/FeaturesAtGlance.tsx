import useIsDesktop from "@/hooks/useIsDesktop";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ArrowRight, Blocks, PaletteIcon, SparkleIcon, Sun } from "lucide-react";
import { FC, useState } from "react";
import { HeadingAndDescription } from "./FeaturesAndBenefitsSection";

// Feature structure
type Feature = {
  icon: JSX.Element;
  heading: string;
  description: string;
  actionText: string;
}

// Feature list
const features: Feature[] = [
  { icon: <Sun />, heading: "Dark/light mode toggle", description: "Easily fit your chatbot to common dark or light color themes", actionText: "Try it" },
  { icon: <PaletteIcon />, heading: "Premade themes", description: "A growing selection of premade, free-to-use themes", actionText: "Swap theme" },
  { icon: <Blocks />, heading: "Added functionality with plugins", description: "Easily implement additional features with plugins", actionText: "See example" },
  { icon: <SparkleIcon />, heading: "LLM support out of the box", description: "Implement AI functionality easily", actionText: "View demo" }
];

// Shared styles
const featureStyles = (selected: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 2,
  borderRadius: "12px",
  opacity: selected ? 1 : 0.5,
  backgroundColor: selected ? "background.muted" : "transparent",
  cursor: "pointer",
  transition: "background-color 0.3s",
  "&:hover": { backgroundColor: "background.muted" },
  border: "1px solid",
  borderColor: selected ? "grey.700" : "transparent"
});

const actionButtonStyles = {
  ml: "auto",
  textTransform: "none",
  color: "text.primary",
  backgroundColor: "grey.700",
  borderRadius: "8px",
  gap: 1
};

// Props for FeatureItem components
type FeatureItemProps = {
  onClick: () => void;
  selected: boolean;
} & Feature

// Desktop Feature Item
const FeatureItem: FC<FeatureItemProps> = ({ icon, heading, description, actionText, onClick, selected }) => (
  <Box sx={featureStyles(selected)} onClick={onClick}>
    <IconButton>{icon}</IconButton>
    <Box>
      <Typography fontWeight="bold">{heading}</Typography>
      <Typography color="text.secondary" variant="body2">{description}</Typography>
    </Box>
    <Button sx={actionButtonStyles}>{actionText} <ArrowRight size={16} /></Button>
  </Box>
);

// Mobile Feature Item
const MobileFeatureItem: FC<FeatureItemProps> = ({ icon, heading, description, actionText, onClick, selected }) => (
  <Box sx={{ ...featureStyles(selected), flexFlow: "column" }} onClick={onClick}>
    <Box sx={{ display: "grid", gridAutoFlow: "column", gridTemplateRows: "100%", width: "100%" }}>
      <IconButton sx={{ justifySelf: "start" }}>{icon}</IconButton>
      <Button sx={actionButtonStyles}>{actionText} <ArrowRight size={16} /></Button>
    </Box>
    <Box>
      <Typography fontWeight="bold">{heading}</Typography>
      <Typography color="text.secondary" variant="body2">{description}</Typography>
    </Box>
  </Box>
);


// Main FeaturesAtGlance component
const FeaturesAtGlance: FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);
  const isDesktop = useIsDesktop();

  return (
    <Box sx={{ gap: 6, display: "grid" }}>
      <HeadingAndDescription
        description="Modern chatbot with modern features from the get-go. Need something more specific?
        Check out our premade plugins or create a feature request via our Discord."
        heading="Awesome features straight out the box"
      />
      <Box sx={{ display: "grid", gridAutoFlow: isDesktop ? "column" : "row", gridTemplateColumns: isDesktop ? "1fr 1fr" : "100%", gap: 4, p: 4 }}>
        <Box>
          <Box sx={{ display: "grid", gap: 2 }}>
            {features.map((feature, index) => (
              isDesktop ? (
                <FeatureItem
                  key={index}
                  {...feature}
                  selected={selectedFeature === index}
                  onClick={() => setSelectedFeature(index)}
                />
              ) : (
                <MobileFeatureItem
                  key={index}
                  {...feature}
                  selected={selectedFeature === index}
                  onClick={() => setSelectedFeature(index)}
                />
              )
            ))}
          </Box>
        </Box>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          borderRadius: "12px",
          height: 250,
          gridRow: isDesktop ? "1 / -1" : "1 / 2"
        }}>
          <Typography color="text.secondary">Feature Preview</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesAtGlance;
