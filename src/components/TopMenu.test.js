import React from 'react';
import { render } from '@testing-library/react';
import TopMenu from './TopMenu';

test('renders departure search field', () => {
  const topMenu = render(<TopMenu />);
  const divByClass = document.querySelector(".departure-search-cont");
  expect(divByClass.textContent).toEqual('Departure')
});

test('renders destination search field', () => {
    const topMenu = render(<TopMenu />);
    const divByClass = document.querySelector(".destination-search-cont");
    expect(divByClass.textContent).toEqual('Destination')
});

test('renders date search field', () => {
    const topMenu = render(<TopMenu />);
    const divByClass = document.querySelector(".date-search-cont");
    expect(divByClass.textContent).toEqual('Date')
});
