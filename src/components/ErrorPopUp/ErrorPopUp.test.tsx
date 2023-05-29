import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorPopUp } from './ErrorPopUp';

describe('ErrorPopUp component', () => {
  it('ErrorPopUp is render', () => {
    render(<ErrorPopUp message="Test message" />);
    expect(screen.getByText(/Test message/i)).toBeInTheDocument();
  });
});
