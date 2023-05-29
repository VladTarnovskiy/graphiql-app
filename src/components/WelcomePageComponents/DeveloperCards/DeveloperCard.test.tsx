import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { BrowserRouter } from 'react-router-dom';
import { DeveloperCard } from './DeveloperCard';

describe('DeveloperCard component', () => {
  it('DeveloperCard is render', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <DeveloperCard developer="Vlad" />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Vlad/i)).toBeInTheDocument();
  });
});
