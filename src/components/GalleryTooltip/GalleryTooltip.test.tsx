import Tooltip from '@mui/material/Tooltip';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import GalleryTooltip from './GalleryTooltip';

// Mock MUI Tooltip to capture props and still render children
vi.mock('@mui/material/Tooltip', () => {
  const mock = vi.fn((props: any) => <div data-testid="tooltip-mock">{props.children}</div>);
  return { __esModule: true, default: mock };
});

// Helper to mock matchMedia for touch vs non-touch devices
const mockMatchMedia = (isTouch: boolean) => {
  const mql = (query: string) => ({
    matches: isTouch && query === '(hover: none)',
    media: query,
    onchange: null as any,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn(mql),
  });
};

const getLastTooltipProps = () => {
  const calls = (Tooltip as unknown as Mock).mock.calls;
  return calls[calls.length - 1]?.[0] ?? {};
};

beforeEach(() => {
  (Tooltip as unknown as Mock).mockClear();
});

describe('GalleryTooltip', () => {
  it('renders its children', () => {
    mockMatchMedia(false);
    render(
      <GalleryTooltip content="Hello" placement="right">
        <button>Child</button>
      </GalleryTooltip>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('is closed by default and uses right placement by default', () => {
    mockMatchMedia(false);
    render(
      <GalleryTooltip content="Hello">
        <button>Child</button>
      </GalleryTooltip>
    );
    const props = getLastTooltipProps();
    expect(props.open).toBe(false);
    expect(props.placement).toBe('right');
    expect(props.disableFocusListener).toBe(true);
  });

  it('respects custom placement', () => {
    mockMatchMedia(false);
    render(
      <GalleryTooltip content="Hi" placement="top">
        <button>Child</button>
      </GalleryTooltip>
    );
    const props = getLastTooltipProps();
    expect(props.placement).toBe('top');
  });

  it('on non-touch: mouseenter opens, mouseleave closes', () => {
    mockMatchMedia(false);
    render(
      <GalleryTooltip content="Hover me">
        <span>Trigger</span>
      </GalleryTooltip>
    );

    const span = screen.getByText('Trigger').closest('span') ?? screen.getByText('Trigger');
    expect(getLastTooltipProps().open).toBe(false);

    fireEvent.mouseEnter(span as Element);
    expect(getLastTooltipProps().open).toBe(true);

    fireEvent.mouseLeave(span as Element);
    expect(getLastTooltipProps().open).toBe(false);
  });

  it('on touch devices: click toggles open/close; hover ignored', () => {
    mockMatchMedia(true);
    render(
      <GalleryTooltip content="Tap me">
        <span>Trigger</span>
      </GalleryTooltip>
    );

    const span = screen.getByText('Trigger').closest('span') ?? screen.getByText('Trigger');
    expect(getLastTooltipProps().open).toBe(false);

    fireEvent.mouseEnter(span as Element);
    expect(getLastTooltipProps().open).toBe(false);

    fireEvent.click(span as Element);
    expect(getLastTooltipProps().open).toBe(true);

    fireEvent.click(span as Element);
    expect(getLastTooltipProps().open).toBe(false);
  });

  it('forwards onOpen/onClose to control internal state', async () => {
    mockMatchMedia(false);
    render(
      <GalleryTooltip content="Hello">
        <span>Trigger</span>
      </GalleryTooltip>
    );

    const firstProps = getLastTooltipProps();
    await act(async () => {
      firstProps.onOpen?.({});
    });
    expect(getLastTooltipProps().open).toBe(true);

    await act(async () => {
      getLastTooltipProps().onClose?.({});
    });
    expect(getLastTooltipProps().open).toBe(false);
  });

  it('passes correct disableHoverListener/disableTouchListener based on device', () => {
    mockMatchMedia(false);
    render(
      <GalleryTooltip content="A">
        <span>Trigger</span>
      </GalleryTooltip>
    );
    let props = getLastTooltipProps();
    expect(props.disableHoverListener).toBe(true);
    expect(props.disableTouchListener).toBe(false);

    (Tooltip as unknown as Mock).mockClear();
    mockMatchMedia(true);
    render(
      <GalleryTooltip content="B">
        <span>Trigger</span>
      </GalleryTooltip>
    );
    props = getLastTooltipProps();
    expect(props.disableHoverListener).toBe(false);
    expect(props.disableTouchListener).toBe(true);
  });

  it('wraps content inside Typography (via title prop)', () => {
    mockMatchMedia(false);
    render(
      <GalleryTooltip content="Tooltip content">
        <span>Trigger</span>
      </GalleryTooltip>
    );
    const props = getLastTooltipProps();
    expect(props.title?.props?.children).toBe('Tooltip content');
  });
});