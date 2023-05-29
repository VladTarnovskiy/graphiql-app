import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'src/app/store';
import i18n from 'src/i18n/i18n';
import WelcomePage from './Welcome';

describe('About Us Page', () => {
  it('renders About Us page', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <WelcomePage />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Project/i)).toBeDefined();
      expect(screen.getAllByText(/Developers/i)).toBeDefined();
      expect(screen.getAllByText(/Course/i)).toBeDefined();
    });
  });
});
