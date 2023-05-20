import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Loader from './Loader';

describe('Loader component', () => {
  it('Loader is render', async () => {
    render(<Loader />);
    expect(screen.getByTestId('lds-roller')).toBeInTheDocument();
  });
});
