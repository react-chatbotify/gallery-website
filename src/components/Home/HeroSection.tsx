import logo from "@/assets/images/logo.png";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";

const HeroSection = () => {
  const { t } = useTranslation("components/home");

  const links = useMemo(() => t("hero_section.links", { returnObjects: true }) as string[], [t]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npm install react-chatbotify");
  }, []);

  return (
    <Box sx={styles.container}>
      {/* Left Section */}
      <Box sx={styles.leftSection}>
        <Header appName={t("essentials.name")} />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          {t("hero_section.title")}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {t("hero_section.heading.1")}
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "start", md: "center" }} spacing={4}>
          <NPMCommand handleCopy={handleCopy} copyText={t("hero_section.copyText")} />
          <GitHubStats starText={t("hero_section.starText")} forkText={t("hero_section.forkText")} />
        </Stack>

        <Box sx={styles.linksContainer}>
          {links.map((link, index) => (
            <Link key={index} sx={styles.link}>
              {link} <ArrowRight size={16} />
            </Link>
          ))}
        </Box>
      </Box>

      {/* Right Section */}
      <FeaturePreview />
    </Box>
  );
};

// Extracted Components
const Header = ({appName}: {appName: string}) => (
  <Box sx={styles.header}>
    <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
    <Typography fontWeight="bold" color="text.secondary">
      {appName}
    </Typography>
  </Box>
);

const NPMCommand = ({ handleCopy, copyText }: { handleCopy: () => void; copyText: string }) => (
  <Box sx={styles.npmCommand}>
    <Typography variant="body2">npm install react-chatbotify</Typography>
    <Button variant="contained" onClick={handleCopy} sx={styles.copyButton}>
      {copyText}
    </Button>
  </Box>
);

const GitHubStats = ({ starText, forkText }: { starText: string; forkText: string }) => {
  const stats = [
    { text: starText, count: 250 },
    { text: forkText, count: 138 },
  ];

  return (
    <Box sx={styles.statsContainer}>
      {stats.map((item, index) => (
        <Box key={index} sx={styles.statItem}>
          <FaGithub size={20} />
          <Typography variant="body2">
            {item.text} {item.count}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const FeaturePreview = () => (
  <Box sx={styles.previewContainer}>
    <Typography color="text.secondary">Feature Preview</Typography>
  </Box>
);

// Styles Object
const styles = {
  container: {
    display: "flex",
    width: "100vw",
    alignItems: { xs: "center", md: "start" },
    flexDirection: { xs: "column", md: "row" },
    gap: 8,
    p: 7,
    pt: 10,
  },
  leftSection: {
    maxWidth: { xs: "auto", md: "60vw" },
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  logo: {
    width: 32,
    height: 32,
  },
  npmCommand: {
    borderRadius: '16px',
    backgroundColor: "background.muted",
    pl: '16px',
    pr: '10px',
    py: '8px',
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  copyButton: {
    borderRadius: '10px',
    textTransform: "none",
  },
  statsContainer: {
    display: "flex",
    gap: 2,
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  linksContainer: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  previewContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "background.paper",
    borderRadius: 2,
    alignSelf: "center",
    height: 450,
    minWidth: 300,
    border: "1px solid blue",
  },
};

export default HeroSection;
