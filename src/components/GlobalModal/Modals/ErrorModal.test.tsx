// src/components/GlobalModal/Modals/ErrorModal.test.tsx
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ErrorModal from './ErrorModal';

const { setPromptErrorMock, discordUrl } = vi.hoisted(() => ({
  setPromptErrorMock: vi.fn(),
  discordUrl: 'https://discord.example/invite',
}));
const { modalPropsLog } = vi.hoisted(() => ({
  modalPropsLog: [] as any[],
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, def?: string) => def ?? key,
  }),
}));

const { mockUseGlobalModal } = vi.hoisted(() => ({
  mockUseGlobalModal: vi.fn(() => ({ setPromptError: setPromptErrorMock })),
}));
vi.mock('@/context/GlobalModalContext', () => ({
  useGlobalModal: mockUseGlobalModal,
}));

vi.mock('@/constants/Endpoints', () => ({
  Endpoints: { projectCoreDiscordUrl: discordUrl },
}));

vi.mock('@mui/material', async (importOriginal) => {
  const original = await importOriginal<typeof import('@mui/material')>();
  return {
    __esModule: true,
    ...original,
    Modal: (props: any) => {
      modalPropsLog.push(props);
      return (
        <div data-testid="mui-modal" aria-labelledby={props['aria-labelledby']}>
          {props.children}
        </div>
      );
    },
  };
});

const getLastModalProps = () => modalPropsLog.at(-1) ?? {};

beforeEach(() => {
  modalPropsLog.length = 0;
  setPromptErrorMock.mockReset();
  mockUseGlobalModal.mockReset();
  mockUseGlobalModal.mockImplementation(() => ({ setPromptError: setPromptErrorMock }));
});

const locationProto = Object.getPrototypeOf(window.location) as Partial<Location> | null;
const canSpyReload =
  !!locationProto &&
  Object.prototype.hasOwnProperty.call(locationProto, 'reload') &&
  typeof (locationProto as any).reload === 'function';

describe('ErrorModal', () => {
  it('wires Modal props correctly and calls setPromptError(null) on Modal onClose', () => {
    render(<ErrorModal errorMessageKey="error.key.from.i18n" />);
    const props = getLastModalProps();
    expect(props.open).toBe(true);
    expect(props['aria-labelledby']).toBe('error-modal-title');
    props.onClose?.(new Event('click'), 'backdropClick');
    expect(setPromptErrorMock).toHaveBeenCalledTimes(1);
    expect(setPromptErrorMock).toHaveBeenCalledWith(null);
  });

  it('renders title, error message, info icon and the Discord link', () => {
    render(<ErrorModal errorMessageKey="super.bad.error" />);
    expect(screen.getByText('error_modal.title')).toBeInTheDocument();
    expect(screen.getByText('super.bad.error')).toBeInTheDocument();
    expect(screen.getByTestId('InfoIcon')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'error_modal.footnote.2' });
    expect(link).toHaveAttribute('href', discordUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('error_modal.footnote.1')).toBeInTheDocument();
  });

  it.runIf(canSpyReload)('clicking Refresh button triggers window.location.reload', () => {
    const reloadSpy = vi.spyOn(locationProto as any, 'reload').mockImplementation(() => {});
    try {
      render(<ErrorModal errorMessageKey="anything" />);
      screen.getByRole('button', { name: 'error_modal.refresh_page' }).click();
      expect(reloadSpy).toHaveBeenCalledTimes(1);
    } finally {
      reloadSpy.mockRestore();
    }
  });

  it.runIf(!canSpyReload)('renders Refresh button (no click in this env)', () => {
    render(<ErrorModal errorMessageKey="anything" />);
    expect(screen.getByRole('button', { name: 'error_modal.refresh_page' })).toBeInTheDocument();
  });

  it('associates aria-labelledby with the title element id', () => {
    render(<ErrorModal errorMessageKey="x" />);
    const modalRoot = screen.getByTestId('mui-modal');
    const labelledBy = modalRoot.getAttribute('aria-labelledby');
    expect(labelledBy).toBe('error-modal-title');
    const title = screen.getByRole('heading', { level: 5 });
    expect(title).toHaveAttribute('id', 'error-modal-title');
  });
});