import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import style from './footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className='bottom-0 mt-auto flex w-full items-center justify-around p-3 pt-[15px] backdrop-blur-xl'>
      <div className='flex justify-between'>
        <NavLink
          className={`${style.studOne} rs__img mr-[-8px] block h-8 w-8 rounded-full bg-contain bg-no-repeat hover:scale-110 hover:cursor-pointer hover:transition-all active:scale-100`}
          to='https://github.com/AlexGorSer'
        />
        <NavLink
          className={`${style.studTwo} rs__img mr-[-8px] block h-8 w-8 rounded-full bg-contain bg-no-repeat hover:scale-110 hover:cursor-pointer hover:transition-all active:scale-100`}
          to='https://github.com/VladTarnovskiy'
        />
        <NavLink
          className={`${style.studThree} rs__img block h-8 w-8 rounded-full bg-contain bg-no-repeat hover:scale-110 hover:cursor-pointer hover:transition-all active:scale-100`}
          to='https://github.com/DenisKa13051992'
        />
      </div>
      <div className='account__img h-fit font-thin text-teal-500 dark:font-semibold dark:text-base_green_light  md:hidden'>
        ©2023
      </div>
      <NavLink
        className={`${style.rsLogo} rs__img block h-8 w-20 bg-contain bg-no-repeat hover:scale-110 hover:cursor-pointer hover:transition-all active:scale-100`}
        to='https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md'
      />
    </footer>
  );
};
