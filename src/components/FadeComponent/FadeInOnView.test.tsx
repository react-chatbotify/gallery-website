import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

import FadeInOnView from './FadeInOnView';

// Mock framer-motion
vi.mock('framer-motion', async (importOriginal) => {
  const original = await importOriginal<typeof motion>();
  return {
    ...original,
    motion: {
      ...original.motion,
      div: vi.fn(({ children, ...props }) => <div {...props}>{children}</div>),
    },
  };
});

describe('FadeInOnView', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    if (vi.isMockFunction(motion.div)) {
      motion.div.mockClear();
    }
  });

  test('renders children correctly', () => {
    render(
      <FadeInOnView>
        <p>Test Child</p>
      </FadeInOnView>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('passes default props to motion.div', () => {
    render(
      <FadeInOnView>
        <div>Child</div>
      </FadeInOnView>
    );

    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: { opacity: 0, y: 16 }, // Actual default y
        whileInView: { opacity: 1, y: 0 },
        transition: { delay: 0, duration: 0.6 }, // Actual default delay and duration
        viewport: { once: true, amount: 0.3 }, // Actual default amount
      }),
      expect.anything() // For the ref
    );
  });

  test('passes custom delay and duration props to motion.div', () => {
    const customDelay = 0.5;
    const customDuration = 1.0;
    render(
      <FadeInOnView delay={customDelay} duration={customDuration}>
        <div>Child</div>
      </FadeInOnView>
    );

    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: { opacity: 0, y: 16 }, // Actual default y
        whileInView: { opacity: 1, y: 0 },
        transition: { delay: customDelay, duration: customDuration },
        viewport: { once: true, amount: 0.3 }, // Actual default amount
      }),
      expect.anything() // For the ref
    );
  });

  test('passes additional props to motion.div', () => {
    render(
      <FadeInOnView className="custom-class" style={{ color: 'red' }}>
        <div>Child</div>
      </FadeInOnView>
    );

    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        // Default animation props should also be present
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { delay: 0, duration: 0.6 },
        viewport: { once: true, amount: 0.3 },
        // Passed additional props
        className: 'custom-class',
        style: { color: 'red' },
      }),
      expect.anything()
    );
  });
});
