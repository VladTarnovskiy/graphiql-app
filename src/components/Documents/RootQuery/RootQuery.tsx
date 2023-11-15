import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface RootQueryComponentProps {
  getQueries: () => void;
}

export const RootQueryComponent: FC<RootQueryComponentProps> = ({ getQueries }) => {
  const { t } = useTranslation();

  return (
    <div className='root__wrapper'>
      <div className='docs__title mb-4 pr-8 text-2xl text-base_green'>{t('GraphQL.Documents')}</div>
      <div className='root__description mb-2'>{t('GraphQL.RootDescription')}</div>
      <div className='root__title mb-2'>{t('GraphQL.RootTypes')}</div>
      <div className='root__link'>
        <span className='text-base_green'>query: </span>
        <button
          className='types__link text-base_yellow_dark hover:underline'
          type='button'
          onClick={() => {
            getQueries();
          }}
        >
          Query
        </button>
      </div>
    </div>
  );
};
