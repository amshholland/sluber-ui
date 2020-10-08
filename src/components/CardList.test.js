import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';

test('Render CardList and tests if certain text exists', () => {
  render(<CardList />)

  expect(screen.getByText("I'm interested")).toBeInTheDocument()
  expect(screen.getByText(/Departs at:/)).toBeInTheDocument()
  expect(screen.getByText(/Arrives at:/)).toBeInTheDocument()
});

test('Render CardList and tests if certain text exists', () => {
    render(<CardList />)

    screen.getByRole('heading', { name: "Todd S" })
});
