import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTemplate from './PageTemplate';

test('Render CardList and tests if certain text exists', () => {
  render(<PageTemplate />)
  screen.getByRole('heading', { name: "Sluber" })
});
