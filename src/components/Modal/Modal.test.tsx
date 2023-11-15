import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n/i18n';
import { Modal } from './Modal';
import { SettingModal } from '../SettingModal/SettingModal';

describe('Modal component', () => {
  const setCloseFlag = vi.fn();

  it('Modal is render', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Modal setCloseFlag={setCloseFlag}>
            <SettingModal />
          </Modal>
        </Provider>
      </I18nextProvider>,
    );

    expect(screen.getByText('Language')).toBeInTheDocument();
  });
});
