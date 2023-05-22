import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import Header from './Header';

describe('Header component', () => {
  it('Header is render', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Playground/IDE')).toBeInTheDocument();
    });
  });
});
