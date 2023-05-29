import { useTranslation } from 'react-i18next';

interface IRootQueryComponent {
  getQueries: () => void;
}

export const RootQueryComponent = ({ getQueries }: IRootQueryComponent) => {
  const { t } = useTranslation();

  return (
    <div className="root__wrapper">
      <div className="docs__title text-2xl pr-8 mb-4 text-base_green">{t('GraphQL.Documents')}</div>
      <div className="root__description mb-2">{t('GraphQL.RootDescription')}</div>
      <div className="root__title mb-2">{t('GraphQL.RootTypes')}</div>
      <div className="root__link">
        <span className="text-base_green">query: </span>
        <button
          className="types__link text-base_yellow_dark hover:underline"
          type="button"
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
