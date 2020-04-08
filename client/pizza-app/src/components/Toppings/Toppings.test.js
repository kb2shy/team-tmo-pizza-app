import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders topping component', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Toppings/i);
  expect(title).toBeInTheDocument();
  const meatsTitle = getByText(/Meats/i);
  expect(meatsTitle).toBeInTheDocument();
  const veggieTitle = getByText(/veggieTitle/i);
  expect(veggieTitle).toBeInTheDocument();
});
