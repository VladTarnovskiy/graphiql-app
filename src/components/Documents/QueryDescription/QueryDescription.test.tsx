import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { Query } from '../types';
import { QueryDescription } from './QueryDescription';

const mock: Query = {
  name: 'episodes',
  description: 'Get the list of all episodes',
  type: 'Episodes',
  args: [
    {
      name: 'page',
      type: 'Int',
    },
  ],
};

describe('QueryDescription component', () => {
  it('QueryDescription is render', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <QueryDescription docs={mock} getField={() => {}} />
        </Provider>
      </I18nextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/- Type:/i)).toBeInTheDocument();
    });
  });
});
