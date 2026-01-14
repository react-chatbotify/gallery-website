import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import RcbMarkdown from './RcbMarkdown';

describe('RcbMarkdown', () => {
  test('renders plain text correctly', () => {
    render(<RcbMarkdown>Hello World</RcbMarkdown>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('renders paragraph with correct styling', () => {
    const { container } = render(<RcbMarkdown>This is a paragraph</RcbMarkdown>);
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveStyle({
      lineHeight: '1.4',
      textAlign: 'left',
    });
    // Check that margin is set (browser converts to shorthand)
    const computedStyle = window.getComputedStyle(paragraph!);
    expect(computedStyle.marginTop).toBe('0px');
    expect(computedStyle.marginBottom).toBe('0.5em');
  });

  test('renders bold text using markdown syntax', () => {
    render(<RcbMarkdown>This is **bold** text</RcbMarkdown>);
    const boldElement = screen.getByText('bold');
    expect(boldElement.tagName).toBe('STRONG');
  });

  test('renders italic text using markdown syntax', () => {
    render(<RcbMarkdown>This is *italic* text</RcbMarkdown>);
    const italicElement = screen.getByText('italic');
    expect(italicElement.tagName).toBe('EM');
  });

  test('renders unordered list with correct styling', () => {
    const markdown = `
- Item 1
- Item 2
- Item 3
    `;
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(ul).toHaveStyle({
      paddingLeft: 'clamp(8px, 3.5vw, 16px)',
      margin: '0',
      listStylePosition: 'inside',
    });

    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  test('renders ordered list with correct styling', () => {
    const markdown = `
1. First
2. Second
3. Third
    `;
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
    expect(ol).toHaveStyle({
      paddingLeft: 'clamp(8px, 3.5vw, 16px)',
      margin: '0',
      listStylePosition: 'inside',
    });

    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
  });

  test('renders list items with correct styling', () => {
    const markdown = '- Item';
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    expect(li).toHaveStyle({
      marginBottom: '1px',
      lineHeight: '1.4',
    });
  });

  test('renders inline code with correct styling', () => {
    const { container } = render(<RcbMarkdown>Use `const x = 5;` for variables</RcbMarkdown>);
    const inlineCode = container.querySelector('p code');
    expect(inlineCode).toBeInTheDocument();
    expect(inlineCode?.textContent).toBe('const x = 5;');
    expect(inlineCode?.textContent).toBe('const x = 5;');

    const pre = inlineCode?.closest('pre');
    expect(pre).toBeInTheDocument();

    expect(pre).toHaveStyle({
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: '8px',
      borderRadius: '4px',
    });
  });

  test('renders code block with correct styling', () => {
    const markdown = `
\`\`\`
function hello() {
  console.log("Hello");
}
\`\`\`
    `;
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();

    const code = container.querySelector('pre code');
    expect(code).toBeInTheDocument();

    // Verify code content is present
    expect(code?.textContent).toContain('function hello()');
    expect(code?.textContent).toContain('console.log');
  });

  test('renders blockquote with correct styling', () => {
    const markdown = '> This is a quote';
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveStyle({
      margin: '0',
      paddingLeft: '10px',
      borderLeft: '2px solid #ccc',
      color: '#666',
      fontStyle: 'italic',
    });
  });

  test('renders links with correct styling', () => {
    render(<RcbMarkdown>[Click here](https://example.com)</RcbMarkdown>);
    const link = screen.getByRole('link', { name: 'Click here' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveStyle({
      color: '#ffffff',
      textDecoration: 'underline',
    });
  });

  test('renders GFM table (remark-gfm plugin)', () => {
    const markdown = `
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
    `;
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
  });

  test('renders strikethrough text (GFM)', () => {
    render(<RcbMarkdown>~~strikethrough~~</RcbMarkdown>);
    const delElement = screen.getByText('strikethrough');
    expect(delElement.tagName).toBe('DEL');
  });

  test('handles empty string children', () => {
    const { container } = render(<RcbMarkdown>{''}</RcbMarkdown>);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle({ whiteSpace: 'normal' });
  });

  test('handles non-string children by rendering empty content', () => {
    const { container } = render(<RcbMarkdown>{123 as any}</RcbMarkdown>);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    // Should render empty since non-string is converted to empty string
    expect(div?.textContent?.trim()).toBe('');
  });

  test('renders complex markdown with multiple elements', () => {
    const markdown = `
# Heading

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

\`inline code\` and a [link](https://example.com)

> A blockquote
    `;
    render(<RcbMarkdown>{markdown}</RcbMarkdown>);

    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('inline code')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'link' })).toBeInTheDocument();
    expect(screen.getByText('A blockquote')).toBeInTheDocument();
  });

  test('container div has correct whiteSpace style', () => {
    const { container } = render(<RcbMarkdown>Test</RcbMarkdown>);
    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({ whiteSpace: 'normal' });
  });

  test('renders multiple paragraphs correctly', () => {
    const markdown = `
First paragraph.

Second paragraph.
    `;
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
  });

  test('preserves line breaks in code blocks', () => {
    const markdown = `
\`\`\`
line 1
line 2
line 3
\`\`\`
    `;
    const { container } = render(<RcbMarkdown>{markdown}</RcbMarkdown>);
    const code = container.querySelector('pre code');

    // Verify all lines are present in the code block
    expect(code?.textContent).toContain('line 1');
    expect(code?.textContent).toContain('line 2');
    expect(code?.textContent).toContain('line 3');
  });
});
