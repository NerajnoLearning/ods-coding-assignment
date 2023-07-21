import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders input box', () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Enter City\/Airport Code below:/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders pagination', () => {
  render(<App />);
  const paginationElement = screen.getByTestId('pagination');
  expect(paginationElement).toBeInTheDocument();
});

test('renders table with flight data', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Enter City\/Airport Code below:/i);
  fireEvent.change(inputElement, { target: { value: 'LAX' } });
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  const tableElement = await screen.findByRole('table');
  expect(tableElement).toBeInTheDocument();
});

test('displays correct number of flights', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Enter City\/Airport Code below:/i);
  fireEvent.change(inputElement, { target: { value: 'LAX' } });
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  const totalFlightsElement = await screen.findByText(/Total flights:/i);
  expect(totalFlightsElement).toHaveTextContent(/Total flights: \d+/i);
});

test('displays correct flight data', async () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/Enter City\/Airport Code below:/i);
  fireEvent.change(inputElement, { target: { value: 'LAX' } });
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  const flightNumberElement = await screen.findByText(/Flight Number/i);
  expect(flightNumberElement).toBeInTheDocument();
  const departureAirportElement = await screen.findByText(/Departure Airport/i);
  expect(departureAirportElement).toBeInTheDocument();
  const departureTimeElement = await screen.findByText(/Departure Time/i);
  expect(departureTimeElement).toBeInTheDocument();
  const arrivalAirportElement = await screen.findByText(/Arrival Airport/i);
  expect(arrivalAirportElement).toBeInTheDocument();
  const arrivalTimeElement = await screen.findByText(/Arrival Time/i);
  expect(arrivalTimeElement).toBeInTheDocument();
});
