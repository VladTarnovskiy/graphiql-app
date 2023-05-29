import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { Button } from './Button';

describe('Button component', () => {
  it('Button is render', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Button title="Sign In" />
        </Provider>
      </I18nextProvider>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
