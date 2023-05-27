import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import FieldsComponent from './Fields';
import { FieldsInfo } from '../types';

const mock = { description: 'fade is good', type: 'fade is good' };

const fieldsInfo: FieldsInfo = {
  name: 'Charter',
  description: 'Charter is get',
  fields: [['status', mock]],
};

describe('Fields component', () => {
  it('Fields is render', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <FieldsComponent docs={fieldsInfo} getField={() => {}} />
        </Provider>
      </I18nextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/- Fields:/i)).toBeInTheDocument();
    });
  });
});
