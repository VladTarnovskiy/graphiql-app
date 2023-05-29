import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { QueriesComponent } from './Queries';
import { Query } from '../types';

const mock: Array<Query> = [
  {
    name: 'episodes',
    description: 'Get the list of all episodes',
    type: 'Episodes',
    args: [
      {
        name: 'page',
        type: 'Int',
      },
    ],
  },
  {
    name: 'episodesByIds',
    description: 'Get a list of episodes selected by ids',
    type: '[Episode]',
    args: [
      {
        name: 'ids',
        type: '[ID!]!',
      },
    ],
  },
];

describe('Queries component', () => {
  it('Queries is render', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <QueriesComponent docs={mock} getField={() => {}} getQueryDescription={() => {}} />
        </Provider>
      </I18nextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Queries/i)).toBeInTheDocument();
    });
  });
});
