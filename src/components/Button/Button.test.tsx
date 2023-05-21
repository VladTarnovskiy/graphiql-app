import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import Button from './Button';

describe('Button component', () => {
  it('Button is render', () => {
    render(
      <Provider store={store}>
        <Button title="Sign In" />
      </Provider>
    );
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
