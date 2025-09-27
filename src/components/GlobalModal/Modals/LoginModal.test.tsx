import * as MUI from '@mui/material';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LoginModal from './LoginModal';

const { setPromptLoginMock } = vi.hoisted(() => ({
  setPromptLoginMock: vi.fn(),
}));
const { handleLoginMock } = vi.hoisted(() => ({
  handleLoginMock: vi.fn(),
}));

// i18n: return key as label
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, def?: string) => def ?? key,
  }),
}));

// Global modal context
vi.mock('@/context/GlobalModalContext', () => ({
  useGlobalModal: () => ({ setPromptLogin: setPromptLoginMock }),
}));

// Auth service
vi.mock('@/services/authService', () => ({
  handleLogin: handleLoginMock,
}));

vi.mock('@mui/material', async (importOriginal) => {
  const original = await importOriginal<typeof import('@mui/material')>();
  return {
    ...original,
    Modal: vi.fn(({ children, ...props }: any) => (
      <div data-testid="login-modal-mock" {...props}>
        {children}
      </div>
    )),
  };
});

const getLastModalProps = () => {
  const calls = (MUI.Modal as unknown as Mock).mock.calls;
  return calls[calls.length - 1]?.[0] ?? {};
};

beforeEach(() => {
  (MUI.Modal as unknown as Mock).mockClear();
  setPromptLoginMock.mockClear();
  handleLoginMock.mockClear();
});

describe('LoginModal', () => {
  it('renders title, description and login button (i18n keys as labels)', () => {
    render(<LoginModal />);

    expect(screen.getByText('login_modal.continue')).toBeInTheDocument();
    expect(screen.getByText('login_modal.description')).toBeInTheDocument();

    const loginBtn = screen.getByRole('button', { name: 'login_modal.button' });
    expect(loginBtn).toBeInTheDocument();
  });

  it('wires Modal props correctly and calls setPromptLogin(false) on Modal onClose', async () => {
    render(<LoginModal />);

    const props = getLastModalProps();
    expect(props.open).toBe(true);
    expect(props['aria-labelledby']).toBe('login-modal-title');

    await act(async () => {
      props.onClose?.({} as any);
    });
    expect(setPromptLoginMock).toHaveBeenCalledWith(false);
  });

  it('close IconButton triggers setPromptLogin(false)', () => {
    render(<LoginModal />);

    // Find the CloseIcon then climb to its button
    const closeIcon = screen.getByTestId('CloseIcon');
    const closeButton = closeIcon.closest('button') as HTMLButtonElement | null;

    expect(closeButton).not.toBeNull();
    closeButton && fireEvent.click(closeButton);

    expect(setPromptLoginMock).toHaveBeenCalledWith(false);
  });

  it('GitHub login button calls handleLogin()', () => {
    render(<LoginModal />);

    const loginBtn = screen.getByRole('button', { name: 'login_modal.button' });
    fireEvent.click(loginBtn);

    expect(handleLoginMock).toHaveBeenCalledTimes(1);
  });

  it('renders ToS and Privacy links with correct attributes', () => {
    render(<LoginModal />);

    const termsLink = screen.getByRole('link', { name: 'login_modal.footer.terms_of_service' });
    expect(termsLink).toHaveAttribute('href', expect.stringContaining('/terms-of-service'));
    expect(termsLink).toHaveAttribute('target', '_blank');
    expect(termsLink).toHaveAttribute('rel', 'noopener');

    const privacyLink = screen.getByRole('link', { name: 'login_modal.footer.privacy_policy' });
    expect(privacyLink).toHaveAttribute('href', expect.stringContaining('/privacy-policy'));
    expect(privacyLink).toHaveAttribute('target', '_blank');
    expect(privacyLink).toHaveAttribute('rel', 'noopener');
  });

  it('shows footnote i18n keys (placeholders)', () => {
    render(<LoginModal />);
    // Use flexible matcher to handle whitespace/line breaks
    expect(screen.getByText((txt) => txt.includes('login_modal.footnote.1'))).toBeInTheDocument();
    expect(screen.getByText((txt) => txt.includes('login_modal.footnote.2'))).toBeInTheDocument();
  });
});