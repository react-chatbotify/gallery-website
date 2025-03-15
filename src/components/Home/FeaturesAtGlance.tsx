import useIsDesktop from "@/hooks/useIsDesktop";
import { FeatureItemProps, PrimaryFeature } from "@/interfaces/HomePage";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ArrowRight, Blocks, PaletteIcon, SparkleIcon, Sun } from "lucide-react";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HeadingAndDescription } from "./FeaturesAndBenefitsSection";




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
  borderColor: selected ? "background.secondary" : "transparent"
});

const actionButtonStyles = {
  ml: "auto",
  textTransform: "none",
  color: "text.primary",
  backgroundColor: "background.secondary",
  borderRadius: "8px",
  gap: 1
};



// Desktop Feature Item
const FeatureItem: FC<FeatureItemProps> = ({ Icon, heading, description, actionText, onClick, selected }) => (
  <Box sx={featureStyles(selected)} onClick={onClick}>
    <IconButton>{<Icon />}</IconButton>
    <Box>
      <Typography fontWeight="bold">{heading}</Typography>
      <Typography color="text.secondary" variant="body2">{description}</Typography>
    </Box>
    <Button sx={actionButtonStyles}>{actionText} <ArrowRight size={16} /></Button>
  </Box>
);

// Mobile Feature Item
const MobileFeatureItem: FC<FeatureItemProps> = ({ Icon, heading, description, actionText, onClick, selected }) => (
  <Box sx={{ ...featureStyles(selected), flexFlow: "column" }} onClick={onClick}>
    <Box sx={{ display: "grid", gridAutoFlow: "column", gridTemplateRows: "100%", width: "100%" }}>
      <IconButton sx={{ justifySelf: "start" }}>{ <Icon />}</IconButton>
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
  const {t} = useTranslation("components/home")
  const [selectedFeature, setSelectedFeature] = useState<number>(0);
  const isDesktop = useIsDesktop();
  const features = useMemo(()=>{
    const icons = [Sun, PaletteIcon, Blocks, SparkleIcon];
    const itemsTexts = t("primary_features_section.features", { returnObjects: true }) as PrimaryFeature[];
    return icons.map((Icon, index) => ({ Icon, ...itemsTexts[index] }));
  }, 
  [t])

  return (
    <Box sx={{ gap: 6, display: "grid" }}>
      <HeadingAndDescription
        description={t("primary_features_section.heading.1")}
        heading={t("primary_features_section.title")}
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
