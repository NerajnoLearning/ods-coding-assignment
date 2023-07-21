import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const props = {
    currentPage: 1,
    changePage: jest.fn(),
    totalPages: 5,
    pages: [1, 2, 3, 4, 5]
  };

  it('renders without crashing', () => {
    const { getByRole } = render(<Pagination {...props} />);
    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('disables the Previous button on the first page', () => {
    const { getByText } = render(<Pagination {...props} />);
    const previousButton = getByText('Previous');
    expect(previousButton).toBeDisabled();
    fireEvent.click(previousButton);
    expect(props.changePage).not.toHaveBeenCalled();
  });

  it('disables the Next button on the last page', () => {
    const { getByText } = render(<Pagination {...props} currentPage={5} />);
    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(props.changePage).not.toHaveBeenCalled();
  });

  it('calls the changePage function when a page button is clicked', () => {
    const { getByText } = render(<Pagination {...props} />);
    const pageButton = getByText('3');
    fireEvent.click(pageButton);
    expect(props.changePage).toHaveBeenCalledWith(3);
  });
});
