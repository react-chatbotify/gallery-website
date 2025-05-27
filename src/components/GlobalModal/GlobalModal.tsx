import ReactDOM from 'react-dom';

import { useGlobalModal } from '@/context/GlobalModalContext';

import ErrorModal from './Modals/ErrorModal';
import LoginModal from './Modals/LoginModal';

/**
 * Wraps all global modals for rendering logic.
 */
const GlobalModal = () => {
  const { promptLogin, promptError } = useGlobalModal();

  /**
   * Checks global modal state to decide which modal to render.
   */
  const renderGlobalModal = () => {
    let modal = null;
    if (promptLogin) {
      modal = <LoginModal />;
    }

    if (promptError) {
      modal = <ErrorModal errorMessageKey={promptError} />;
    }

    return ReactDOM.createPortal(modal, document.getElementById('modal-container') || document.body);
  };

  return renderGlobalModal();
};

export default GlobalModal;
