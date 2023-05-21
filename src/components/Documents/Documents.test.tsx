import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import Documents from './Documents';

describe('Documents component', () => {
  it('Documents is render', () => {
    render(
      <Provider store={store}>
        <Documents />
      </Provider>
    );
    expect(screen.getByText(/Documents/i)).toBeInTheDocument();
  });
});
