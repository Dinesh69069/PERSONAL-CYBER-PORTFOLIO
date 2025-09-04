/// <reference types="vitest" />
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Extend the matchers
declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
}

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver if needed
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;
