import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

import SearchBar from './SearchBar';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Adjusting to match how SearchBar.tsx likely calls t()
      if (key === 'searchbar.placeholder') return 'Search...';
      if (key === 'searchbar.tooltip') return 'Search Tooltip'; // Add other keys if needed
      return key;
    },
  }),
}));

// Mock react-router-dom's useSearchParams
let mockSearchParamsGet: (key: string) => string | null = () => null;
vi.mock('react-router-dom', async (importOriginal) => {
 const original = await importOriginal();
 return {
    ...original,
    useSearchParams: () => [
      { get: mockSearchParamsGet },
      vi.fn(), // Mock setSearchParams, not used by this component directly for setting
    ],
 };
});


describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    // Reset mockSearchParamsGet to default behavior for each test
    mockSearchParamsGet = () => null;
  });

  test('renders the input field with placeholder text', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', 'Search...');
  });

  test('updates query state on input change', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    expect(inputElement).toHaveValue('test query');
  });

  test('calls onSearch prop with the query when Enter is pressed', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'enter test' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('enter test');
  });

  test('does not call onSearch if Enter is pressed but query has not changed since last Enter', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');

    // First search
    fireEvent.change(inputElement, { target: { value: 'first query' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('first query');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);

    // Press Enter again with the same query
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledTimes(1); // Should still be 1
  });

  test('calls onSearch if query changes after an initial Enter press', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'query one' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('query one');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);

    fireEvent.change(inputElement, { target: { value: 'query two' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('query two');
    expect(mockOnSearch).toHaveBeenCalledTimes(2);
  });


  test('initializes with query from searchParams', () => {
    mockSearchParamsGet = (key: string) => key === 'searchQuery' ? 'initial query from params' : null;
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('initial query from params');
  });

  test('does not call onSearch on initial render even if searchParams has query', () => {
    mockSearchParamsGet = (key: string) => key === 'searchQuery' ? 'initial query' : null;
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('pressing Enter with empty string does not call onSearch if initial query was also empty or null', () => {
    mockSearchParamsGet = () => null; // Ensure no initial query from params
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(''); // Starts empty

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('pressing Enter with empty string DOES call onSearch if initial query was non-empty', () => {
    mockSearchParamsGet = (key: string) => key === 'searchQuery' ? 'initial query' : null;
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('initial query');

    // User clears the input and presses Enter
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
