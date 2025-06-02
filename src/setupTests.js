// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn((url) => {
  // Default mock response for i18n JSON files
  if (url && typeof url === 'string' && url.endsWith('.json')) {
    return Promise.resolve({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({})), // Mock empty JSON content
      json: () => Promise.resolve({}), // Mock empty JSON object
    });
  }
  // Default mock response for other fetch calls (e.g., GitHub API)
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ stars: 123, forks: 456 }),
    text: () => Promise.resolve(JSON.stringify({ stars: 123, forks: 456 })),
  });
});

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('')),
  },
  writable: true,
  configurable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
