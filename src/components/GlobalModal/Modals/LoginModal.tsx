import { GitHub } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Link, Modal, Typography } from '@mui/material';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalModal } from '@/context/GlobalModalContext';
import { handleLogin } from '@/services/authService';

/**
 * Prompts user login when required.
 */
const LoginModal = () => {
  // lazy loads translations
  const { t } = useTranslation('components/globalmodal');

  // shows modals when required
  const { setPromptLogin } = useGlobalModal();
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <Modal open onClose={() => setPromptLogin(false)} aria-labelledby="login-modal-title">
      <Box
        ref={modalRef}
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          left: '50%',
          maxWidth: '500px',
          p: 4,
          position: 'absolute',
          textAlign: 'center',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
        }}
      >
        <IconButton
          onClick={() => setPromptLogin(false)}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="login-modal-title"
          variant="h5"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          {t('login_modal.continue')}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 4,
          }}
        >
          {t('login_modal.description')}
        </Typography>

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            mb: 4,
          }}
        >
          <Button
            onClick={() => handleLogin()}
            variant="contained"
            color="primary"
            startIcon={<GitHub />}
            style={{ width: '60%' }}
            sx={{
              mb: 2,
              px: 3,
              py: 1.5,
            }}
          >
            {t('login_modal.button')}
          </Button>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            {t('login_modal.footnote.1')}{' '}
            <Link href="/terms-of-service" target="_blank" rel="noopener">
              {t('login_modal.footer.terms_of_service')}
            </Link>{' '}
            {t('login_modal.footnote.2')}{' '}
            <Link href="/privacy-policy" target="_blank" rel="noopener">
              {t('login_modal.footer.privacy_policy')}
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
