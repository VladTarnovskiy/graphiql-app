import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import Textarea from './Textarea';

describe('Textarea component', () => {
  const setVariables = vi.fn();
  it('Textarea is Textarea', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Textarea setVariables={setVariables} value="test" />
        </Provider>
      </I18nextProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
