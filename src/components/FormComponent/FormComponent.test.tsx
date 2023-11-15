import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { FormComponent } from './FormComponent';

describe('FormComponent component', () => {
  it('FormComponent is render', async () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <FormComponent
              headerTitle='Registration'
              buttonTitle='Registration'
            />
          </Provider>
        </I18nextProvider>
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.queryAllByText(/Registration/i)[0]).toBeInTheDocument();
    });
  });
});
