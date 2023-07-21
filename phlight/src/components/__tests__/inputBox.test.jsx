import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputBox from '../inputBox';

describe('InputBox', () => {
  const inputAutofill = {
    BNA: 'Nashville',
    LAX: 'Los Angeles International Airport',
    SFO: 'San Francisco International Airport',
    ORD: 'O\'Hare International Airport',
    DFW: 'Dallas/Fort Worth International Airport',
    MIA: 'Miami International Airport',
    YYZ: 'Toronto Pearson International Airport',
    YVR: 'Vancouver International Airport',
    LHR: 'London Heathrow Airport',
    CDG: 'Charles de Gaulle Airport',
  };

  const getFlights = jest.fn();

  it('renders an input box', () => {
    const { getByPlaceholderText } = render(<InputBox inputAutofill={inputAutofill} getFlights={getFlights} />);
    const inputBox = getByPlaceholderText('Yup, Right Here');
    expect(inputBox).toBeInTheDocument();
  });

  it('renders a list of options when input is entered', () => {
    const { getByPlaceholderText, getByText } = render(<InputBox inputAutofill={inputAutofill} getFlights={getFlights} />);
    const inputBox = getByPlaceholderText('Yup, Right Here');
    fireEvent.change(inputBox, { target: { value: 'L' } });
    const option1 = getByText('LAX');
    const option2 = getByText('LHR');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('calls getFlights when an option is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<InputBox inputAutofill={inputAutofill} getFlights={getFlights} />);
    const inputBox = getByPlaceholderText('Yup, Right Here');
    fireEvent.change(inputBox, { target: { value: 'JFK' } });
    const option = getByText('JFK');
    fireEvent.click(option);
    expect(getFlights).toHaveBeenCalledWith('JFK');
  });
});
