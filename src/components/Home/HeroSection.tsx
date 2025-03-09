import logo from "@/assets/images/logo.png";
import { Avatar, AvatarGroup, Box, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * Shows a broad overview of the chatbot when user lands on the home page.
 */
const HeroSection = () => {
  // lazy loads translations
  const { t } = useTranslation("components/home");



  const LogoAndText = () => (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Box component="img" src={logo} alt="Logo" sx={{ width: 32, height: 32, mx: 2 }} />
      <Typography variant="h6">
        {t("hero_section.name")}
      </Typography>
    </Box>
  );

  const QuickLinks = () => {
    const alllinks = t("hero_section.quicklinks", { returnObjects: true }) as string[];
    return (
      <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignSelf: 'start', alignItems: 'center', justifyContent: 'center' }}>
        {alllinks.map((link, index) => (
          <Link
            key={index}
            href="#"
            sx={{
              color: 'text.primary',
              ":hover": { borderColor: 'primary.main' },
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid white',
              borderColor: 'grey.800',
              padding: '12px 20px',
              borderRadius: 100
            }}
          >
            {link}
          </Link>
        ))}
      </Box>
    );
  };

  const avatars = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/men/6.jpg",
  ];

  const UsedByDevs = () => (
    <Box textAlign="center" sx={{ backgroundColor: "#121212", p: 4, alignSelf: 'end', borderRadius: 2 }}>
      <AvatarGroup max={9} sx={{ justifyContent: "center" }}>
        {avatars.map((src, index) => (
          <Avatar style={{ border: '1px solid white' }} key={index} src={src} />
        ))}
      </AvatarGroup>
      <Typography color="white" mt={2} dangerouslySetInnerHTML={ { __html: t("hero_section.usedByDevs") } } fontSize={18}>
        
      </Typography>
      <Link href="#" color="primary" sx={{ display: "block", mt: 1 }}>
        {t("hero_section.devsExperience")} →
      </Link>
    </Box>
  );

  return (
    <Box sx={{ display: 'grid', gap: 4, justifyItems: 'center', minHeight: '90vh', py: '10px', gridTemplateColumns: '100%' }}>
      <Box sx={{ display: 'flex', mt: '50px', maxWidth: '700px', width: '90vw', height: 'fit-content', textAlign: 'center', flexDirection: 'column', alignItems: 'center', color: "text.muted", fontWeight: "strong", justifyItems: 'center' }}>
        <LogoAndText />
        <Typography variant="h2" sx={{ m: 3, color: "text.primary", lineHeight: 0.9, fontWeight: "bold" }}>
          {t("hero_section.title")}
        </Typography>
        <Typography variant="h6">
          {t("hero_section.body_text.1")}
        </Typography>
      </Box>
      <QuickLinks />
      <UsedByDevs />
    </Box>
  );
};

export default HeroSection;
