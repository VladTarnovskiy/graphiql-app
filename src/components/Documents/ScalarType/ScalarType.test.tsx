import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { ScalarType } from '../types';
import { ScalarTypeComponent } from './ScalarType';

const mock: ScalarType = {
  name: 'episodes',
  description: 'Get the list of all episodes',
};

describe('ScalarType component', () => {
  it('ScalarType is render', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ScalarTypeComponent docs={mock} />
        </Provider>
      </I18nextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Get the list of all episodes/i)).toBeInTheDocument();
    });
  });
});
