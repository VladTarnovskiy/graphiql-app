import { clsx } from 'clsx';
import { t } from 'i18next';
import { FC } from 'react';

interface InfoNavigationProps {
  changeRequestInputs: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fieldFlag: string;
}

export const InfoNavigation: FC<InfoNavigationProps> = ({ changeRequestInputs, fieldFlag }) => {
  return (
    <>
      <button
        className={clsx(
          'project mr-4 cursor-pointer hover:text-base_green xs:mr-2',
          fieldFlag === 'project' ? ['border-b-[1px] border-base_green'] : '',
        )}
        onClick={changeRequestInputs}
        type='button'
        data-testid='infoNavigation-button'
      >
        {t(`Welcome.Buttons.Project`)}
      </button>

      <button
        className={clsx(
          'developers mr-4 cursor-pointer hover:text-base_green xs:mr-2',
          fieldFlag === 'developers' ? ['border-b-[1px] border-base_green'] : '',
        )}
        onClick={changeRequestInputs}
        type='button'
      >
        {t(`Welcome.Buttons.Developers`)}
      </button>

      <button
        className={clsx(
          'course mr-4 cursor-pointer hover:text-base_green xs:mr-2',
          fieldFlag === 'course' ? ['border-b-[1px] border-base_green'] : '',
        )}
        onClick={changeRequestInputs}
        type='button'
      >
        {t(`Welcome.Buttons.Course`)}
      </button>
    </>
  );
};
