import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
/**
 * Renders markdown content passed as children.
 *
 * @param children markdown text to render
 */
const MarkdownWrapper = ({ children }: { children: React.ReactNode }) => {
  // Ensure children is a string
  const markdownText = typeof children === 'string' ? children : '';

  return (
    <div style={{ whiteSpace: 'normal' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ ...props }) => (
            <p
              style={{
                margin: 0,
                marginBottom: '0.5em',
                lineHeight: 1.4,
                textAlign: 'left',
              }}
            >
              {props.children}
            </p>
          ),

          ul: ({ ...props }) => (
            <ul
              style={{
                paddingLeft: 'clamp(8px, 3.5vw, 16px)',
                margin: 0,
                listStylePosition: 'inside', // KEY CHANGE
              }}
            >
              {props.children}
            </ul>
          ),

          ol: ({ ...props }) => (
            <ol
              style={{
                paddingLeft: 'clamp(8px, 3.5vw, 16px)',
                margin: 0,
                listStylePosition: 'inside', // KEY CHANGE
              }}
            >
              {props.children}
            </ol>
          ),

          // KEY CHANGE: Remove custom bullet rendering, let browser handle bullets & numbers
          li: ({ ...props }) => (
            <li
              style={{
                marginBottom: '1px',
                lineHeight: 1.4,
              }}
            >
              {props.children}
            </li>
          ),

          code({ inline, children }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
            if (inline) {
              return (
                <code
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    fontFamily: 'inherit',
                    fontSize: '0.95em',
                  }}
                >
                  {children}
                </code>
              );
            }

            return (
              <pre
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  padding: '8px',
                  borderRadius: '4px',
                  overflowX: 'auto',
                  margin: '0.5em 0',
                  whiteSpace: 'pre-wrap', // preserve line breaks
                }}
              >
                <code>{children}</code>
              </pre>
            );
          },

          blockquote: ({ ...props }) => (
            <blockquote
              style={{
                margin: 0,
                paddingLeft: '10px',
                borderLeft: '2px solid #ccc',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              {props.children}
            </blockquote>
          ),
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownWrapper;
