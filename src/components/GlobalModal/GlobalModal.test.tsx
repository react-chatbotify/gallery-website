import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as GlobalModalCtx from '@/context/GlobalModalContext';

import GlobalModal from './GlobalModal';

const { modalState } = vi.hoisted(() => ({
  modalState: { promptLogin: false as boolean, promptError: null as string | null },
}));

vi.mock('@/context/GlobalModalContext', () => {
  const useGlobalModal = vi.fn(() => modalState);
  return { useGlobalModal };
});


vi.mock('./Modals/LoginModal', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-login-modal">LOGIN_MODAL</div>,
}));
vi.mock('./Modals/ErrorModal', () => ({
  __esModule: true,
  default: ({ errorMessageKey }: { errorMessageKey: string }) => (
    <div data-testid="mock-error-modal">{errorMessageKey}</div>
  ),
}));

const ensurePortalContainer = () => {
  let container = document.getElementById('modal-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'modal-container';
    document.body.appendChild(container);
  }
  return container;
};

beforeEach(() => {
  // reset DOM + state
  document.body.innerHTML = '';
  modalState.promptLogin = false;
  modalState.promptError = null;

  // reset context mock calls
  (GlobalModalCtx.useGlobalModal as any).mockClear?.();
});

describe('GlobalModal', () => {
  it('renders nothing when neither login nor error is requested', () => {
    const container = ensurePortalContainer();

    render(<GlobalModal />);

    expect(GlobalModalCtx.useGlobalModal).toHaveBeenCalled();

    // No modals in portal container nor body
    expect(container.querySelector('[data-testid="mock-login-modal"]')).toBeNull();
    expect(container.querySelector('[data-testid="mock-error-modal"]')).toBeNull();
    expect(screen.queryByTestId('mock-login-modal')).toBeNull();
    expect(screen.queryByTestId('mock-error-modal')).toBeNull();
  });

  it('renders LoginModal when promptLogin is true (into #modal-container)', () => {
    const container = ensurePortalContainer();
    modalState.promptLogin = true;

    render(<GlobalModal />);

    expect(GlobalModalCtx.useGlobalModal).toHaveBeenCalled();

    // login modal should be inside the portal container
    expect(container.querySelector('[data-testid="mock-login-modal"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="mock-error-modal"]')).toBeNull();
  });

  it('renders ErrorModal with message when promptError is set', () => {
    const container = ensurePortalContainer();
    modalState.promptError = 'some.error.key';

    render(<GlobalModal />);

    expect(GlobalModalCtx.useGlobalModal).toHaveBeenCalled();

    const err = container.querySelector('[data-testid="mock-error-modal"]');
    expect(err).not.toBeNull();
    expect(err!.textContent).toBe('some.error.key');
    expect(container.querySelector('[data-testid="mock-login-modal"]')).toBeNull();
  });

  it('prefers ErrorModal over LoginModal when both flags are set', () => {
    const container = ensurePortalContainer();
    modalState.promptLogin = true;
    modalState.promptError = 'override.error';

    render(<GlobalModal />);

    expect(GlobalModalCtx.useGlobalModal).toHaveBeenCalled();

    expect(container.querySelector('[data-testid="mock-error-modal"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="mock-login-modal"]')).toBeNull();
  });

  it('falls back to document.body when #modal-container is missing', () => {
    // no ensurePortalContainer() → should portal to body
    modalState.promptLogin = true;

    render(<GlobalModal />);

    expect(GlobalModalCtx.useGlobalModal).toHaveBeenCalled();

    // login modal should exist in body (since there’s no container)
    const login = document.body.querySelector('[data-testid="mock-login-modal"]');
    expect(login).not.toBeNull();
  });

  it('rerenders correctly when state changes (login → error)', () => {
    const container = ensurePortalContainer();
    modalState.promptLogin = true;

    const { rerender } = render(<GlobalModal />);
    expect(container.querySelector('[data-testid="mock-login-modal"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="mock-error-modal"]')).toBeNull();

    modalState.promptLogin = false;
    modalState.promptError = 'err.key';
    rerender(<GlobalModal />);

    expect(container.querySelector('[data-testid="mock-login-modal"]')).toBeNull();
    const err = container.querySelector('[data-testid="mock-error-modal"]');
    expect(err).not.toBeNull();
    expect(err!.textContent).toBe('err.key');
  });
});