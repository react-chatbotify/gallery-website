import { Endpoints } from "@/constants/Endpoints";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useRouteError } from "react-router-dom";

/**
 * Standard error page to show when an error is encountered.
 */
const ErrorPage = () => {
  // lazy load translations
  const { t } = useTranslation("pages/error");

  // eslint-disable-next-line
  const error: any = useRouteError();
  console.error(error);

  return (
    <Box
      id="error-page"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 2,
        p: 4,
        textAlign: "center",
      }}
    >
      <InfoIcon sx={{ fontSize: 40, color: "text.primary" }} />
      <Typography variant="h4" component="h1" color="text.primary">
        {t("error.title")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("error.paragraph")}
      </Typography>
      <Typography variant="body2" color="error.main">
        <i>{t("error.footnote.1")}</i>
        <Link
          to={Endpoints.projectDiscordUrl}
          target="_blank"
          style={{
            color: "secondary",
            textDecoration: "underline",
          }}
        >
          <i>{t("error.footnote.2")}</i>
        </Link>
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        {t("error.go_back_home")}
      </Button>
    </Box>
  );
};

export default ErrorPage;
