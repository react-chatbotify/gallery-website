import { Box, Typography } from "@mui/material";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AvatarsGroup from "./AvatarsGroup";

const REACT_CHATBOTIFY_GALLERY_URL = "https://github.com/React-ChatBotify/gallery-website";
const REACT_CHATBOTIFY_GALLERY = "react-chatbotify/gallery-website";
const REACT_CHATBOTIFY_GALLERY_TITLE = "Gallery Website";

const REACT_CHATBOTIFY_GALLERY_API_URL = "https://github.com/React-ChatBotify/gallery-api";
const REACT_CHATBOTIFY_GALLERY_API = "react-chatbotify/gallery-api";
const REACT_CHATBOTIFY_GALLERY_API_TITLE = "Gallery API";

/**
 * Shows the list of contributors for each project repository that helped made the overall project possible.
 */
const ContributorsSection = () => {
  // lazy loads translations
  const { t } = useTranslation("components/home");

  return (
    <Box component="section">
      {/* Contributors Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "center", lg: "flex-start" },
          textAlign: { xs: "center", lg: "left" },
          justifyContent: { lg: "space-between" },
        }}
      >
        {/* Left Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", lg: "flex-start" },
            gap: 2,
            marginBottom: { xs: 6, lg: 0 },
          }}
        >
          <Users color="secondary" size={48} /> {/* Icon */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", lg: "3rem" },
            }}
          >
            {t("contributors_section.title")}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1rem", lg: "1.125rem" },
              maxWidth: 650,
            }}
          >
            {t("contributors_section.main_paragraph")}
          </Typography>
        </Box>

        {/* Avatars Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 3, lg: 5 },
            paddingTop: { lg: 16 },
          }}
        >
          <AvatarsGroup
            repoUrl={REACT_CHATBOTIFY_GALLERY_URL}
            repoName={REACT_CHATBOTIFY_GALLERY}
            repoTitle={REACT_CHATBOTIFY_GALLERY_TITLE}
          />
          <AvatarsGroup
            repoUrl={REACT_CHATBOTIFY_GALLERY_API_URL}
            repoName={REACT_CHATBOTIFY_GALLERY_API}
            repoTitle={REACT_CHATBOTIFY_GALLERY_API_TITLE}
          />
        </Box>
      </Box>

      {/* How to Contribute */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", lg: "flex-start" },
          my: 12,
          textAlign: { xs: "center", lg: "left" },
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          {t("contributors_section.how_to_contribute_title")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1rem", lg: "1.125rem" },
            maxWidth: 650,
          }}
        >
          {t("contributors_section.how_to_contribute_body_text.1")}
          <Link
            to={REACT_CHATBOTIFY_GALLERY_URL}
            target="_blank"
            style={{
              color: "secondary",
              textDecoration: "underline",
            }}
          >
            {t("contributors_section.how_to_contribute_body_text.2")}
          </Link>
          {t("contributors_section.how_to_contribute_body_text.3")}
        </Typography>
      </Box>

      {/* Contact us */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", lg: "flex-start" },
          pb: 12,
          textAlign: { xs: "center", lg: "left" },
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          {t("contributors_section.contact_us_title")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1rem", lg: "1.125rem" },
            maxWidth: 650,
          }}
        >
          {t("contributors_section.contact_us_body_text.1")}
          <Link
            to={REACT_CHATBOTIFY_GALLERY}
            target="_blank"
            style={{
              color: "secondary",
              textDecoration: "underline",
            }}
          >
            {t("contributors_section.contact_us_body_text.2")}
          </Link>
          {t("contributors_section.contact_us_body_text.3")}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContributorsSection;
