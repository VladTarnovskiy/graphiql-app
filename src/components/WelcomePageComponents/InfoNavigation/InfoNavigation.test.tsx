import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { InfoNavigation } from './InfoNavigation';

describe('InfoNavigation component', () => {
  it('InfoNavigation is render', async () => {
    const mock = vi.fn();
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <InfoNavigation changeRequestInputs={mock} fieldFlag="project" />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('infoNavigation-button'));
    });
  });
});
