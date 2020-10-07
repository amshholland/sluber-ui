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

// test('renders learn react link', () => {
//     const app = render(<CardList />);
//     const appByClass = document.querySelector(".MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom p");
//     expect(appByClass.textContent).toEqual("Todd S")
// });
  
