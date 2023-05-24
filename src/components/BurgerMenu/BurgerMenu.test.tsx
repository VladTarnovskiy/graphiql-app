import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { BrowserRouter } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

describe('BurgerMenu component', () => {
  it('BurgerMenu is render', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <BurgerMenu />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/About/i)).toBeDefined();
    });
  });
});
