import logo from "@/assets/images/logo.png";
import { Box, Link, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaDiscord, FaGithub } from "react-icons/fa";


export default function Footer(): JSX.Element {
  const genericLinksStyles = { color: "text.muted", textDecoration: "none", ":hover": { color: "text.primary" } };
  const {t} = useTranslation("components/home");
  const footerLinks = useMemo(()=>{
    return t("footer.links", {returnObjects: true}) as any;
  }, [t])
  return (
    <Box component="footer" sx={{ p: 4, pb: 15, color: "text.primary" }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="space-between">
        <Stack justifyContent="space-between" spacing={5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box component="img" src={logo} alt="Logo" sx={{ width: 32, height: 32 }} />
            <Typography fontWeight="bold" variant="h6">{t("essentials.name")}</Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Link sx={genericLinksStyles} href="#"><FaDiscord size={25} /></Link>
            <Link sx={genericLinksStyles} href="#"><FaGithub size={25} /></Link>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography fontWeight="bold" variant="h6">{footerLinks[0].title}</Typography>
          <Link sx={genericLinksStyles} href="#">{footerLinks[0].children[0]}</Link>
          <Link sx={genericLinksStyles} href="#">{footerLinks[0].children[1]}</Link>
        </Stack>
        <Stack spacing={3}>
          <Typography fontWeight="bold" variant="h6">{footerLinks[1].title}</Typography>
          <Link sx={genericLinksStyles} href="#">{footerLinks[1].children[0]}</Link>
          <Link sx={genericLinksStyles} href="#">{footerLinks[1].children[1]}</Link>
        </Stack>
        <Stack spacing={3}>
          <Typography fontWeight="bold" variant="h6">{footerLinks[2].title}</Typography>
          <Link sx={genericLinksStyles} href="#">{footerLinks[2].children[0]}</Link>
          <Link sx={genericLinksStyles} href="#">{footerLinks[2].children[1]}</Link>
        </Stack>
      </Stack>
    </Box>
  );
}
