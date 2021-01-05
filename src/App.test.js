import { render, screen } from '@testing-library/react';
import Register from './pages/Register';

test('renders login page', () => {
  render(<Register />);
  const linkElement = screen.getByText(/Register account/i);
  expect(linkElement).toBeInTheDocument();
});
