import logo from "@/assets/images/logo.png";
import { Box, Link, Stack, Typography } from "@mui/material";
import { Gamepad2, Github } from "lucide-react";

export default function Footer(): JSX.Element {
  const genericLinksStyles = { color: "text.muted", textDecoration: "none", ":hover": { color: "text.primary" } };
  
  return (
    <Box component="footer" sx={{ p: 4, pb: 15, color: "text.primary" }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="space-between">
        <Stack justifyContent="space-between" spacing={5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box component="img" src={logo} alt="Logo" sx={{ width: 32, height: 32 }} />
            <Typography fontWeight="bold" variant="h6">React ChatBotify</Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Link sx={genericLinksStyles} href="#"><Gamepad2 /></Link>
            <Link sx={genericLinksStyles} href="#"><Github /></Link>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Typography fontWeight="bold" variant="h6">About us</Typography>
          <Link sx={genericLinksStyles} href="#">Team and contributors</Link>
          <Link sx={genericLinksStyles} href="#">Sponsors</Link>
        </Stack>
        <Stack spacing={3}>
          <Typography fontWeight="bold" variant="h6">How to contribute</Typography>
          <Link sx={genericLinksStyles} href="#">Getting started</Link>
          <Link sx={genericLinksStyles} href="#">Open issues</Link>
        </Stack>
        <Stack spacing={3}>
          <Typography fontWeight="bold" variant="h6">Legal</Typography>
          <Link sx={genericLinksStyles} href="#">Terms of service</Link>
          <Link sx={genericLinksStyles} href="#">Privacy policy</Link>
        </Stack>
      </Stack>
    </Box>
  );
}
