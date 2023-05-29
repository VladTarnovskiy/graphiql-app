import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { Header } from './Header';

describe('Header component', () => {
  it('Header is render', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Header />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Playground/IDE')).toBeInTheDocument();
    });
  });
});
