import { render, screen } from '@testing-library/react';

import App from './App';

test('renders the main application structure with ToastContainer', async () => {
  render(<App />);
  // Look for the ToastContainer as an indicator that the app's basic structure is rendering
  // It has a specific class "Toastify" and an aria-label
  const toastContainer = await screen.findByLabelText("Notifications Alt+T", {}, { timeout: 2000 });
  expect(toastContainer).toBeInTheDocument();
  expect(toastContainer).toHaveClass('Toastify');
});
