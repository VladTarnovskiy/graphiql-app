import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { HistoryComponent } from './History';

describe('History component', () => {
  it('History is render', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <HistoryComponent onClose={() => {}} />
        </Provider>
      </I18nextProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/History/i)).toBeInTheDocument();
    });
  });
});
