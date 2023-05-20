import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { BrowserRouter } from 'react-router-dom';
import SettingModal from './SettingModal';

describe('SettingModal component', () => {
  it('SettingModal is render', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <SettingModal />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('RU')).toBeInTheDocument();
    });
  });
});
