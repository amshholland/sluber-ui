import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
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

test('renders post a ride button', () => {
    const topMenu = render(<TopMenu />);
    const divByClass = document.querySelector(".post-ride-btn-cont");
    expect(divByClass.textContent).toEqual('Post a Ride')
});
