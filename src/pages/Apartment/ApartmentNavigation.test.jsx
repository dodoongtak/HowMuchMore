import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import ApartmentNavigation from './ApartmentNavigation';

describe('ApartmentNavigation', () => {
  const handleClick = jest.fn();

  function renderApartmentNavigation() {
    return render((
      <ApartmentNavigation onClick={handleClick} />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders apartment navigation', () => {
    renderApartmentNavigation();

    expect(screen.getByRole('link', {
      name: /한강/,
    })).toBeInTheDocument();
    expect(screen.getByRole('link', {
      name: /상권/,
    })).toBeInTheDocument();
  });

  it('calls handleClick upon clicking link', () => {
    renderApartmentNavigation();

    fireEvent.click(screen.getByRole('link', {
      name: /한강/,
    }));

    expect(handleClick).toBeCalledWith({ url: '/apartments/riverside' });
  });
});
