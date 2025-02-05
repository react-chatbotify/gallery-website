import { Endpoints } from "@/constants/Endpoints";
import { useGlobalModal } from "@/context/GlobalModalContext";
import { Home } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

/**
 * Displays an error message in a global modal.
 * 
 * @param errorMessageKey i18n message key string
 */
const ErrorModal: React.FC<{
  errorMessageKey: string;
}> = ({
  errorMessageKey,
}) => {
  const { t } = useTranslation("components/globalmodal");
  const { setPromptError } = useGlobalModal(); // Global context to toggle modal
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <Modal open onClose={() => setPromptError(null)} aria-labelledby="error-modal-title">
      <Box
        ref={modalRef}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxWidth: "500px",
          width: "90%",
          textAlign: "center",
        }}
      >

        <InfoIcon sx={{ fontSize: 40, color: "error.main", mb: 2 }} />
        <Typography
          id="error-modal-title"
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            mb: 2,
          }}
        >
          {t("error_modal.title")}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 3,
          }}
        >
          {t(errorMessageKey)}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "error.main",
            mb: 3,
          }}
        >
          <i>{t("error_modal.footnote.1")}</i>
          <a
            href={Endpoints.projectDiscordUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "secondary",
              textDecoration: "underline",
            }}
          >
            <i>{t("error_modal.footnote.2")}</i>
          </a>
        </Typography>

        <Button
          onClick={() => window.location.reload()}
          variant="contained"
          color="primary"
          startIcon={<Home />}
          style={{ width: "60%" }}
          sx={{
            mb: 2,
            px: 3,
            py: 1.5,
          }}
        >
          {t("error_modal.refresh_page")}
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
