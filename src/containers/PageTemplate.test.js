import React from 'react';
import { render } from '@testing-library/react';
import PageTemplate from './PageTemplate';

test('renders Find a Ride tab', () => {
  const { getElementById } = render(<PageTemplate />);
  const divByClass = document.getElementById('simple-tab-0')
  expect(divByClass.textContent).toEqual('Find a Ride')
});

test('renders Offer a Ride tab', () => {
    const { getElementById } = render(<PageTemplate />);
    const divByClass = document.getElementById('simple-tab-1')
    expect(divByClass.textContent).toEqual('Offer a Ride')
  });