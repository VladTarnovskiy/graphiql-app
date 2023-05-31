import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import style from './footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className='bottom-0 w-full mt-auto flex justify-around items-center p-3 pt-[15px] backdrop-blur-xl'>
      <div className='flex justify-between'>
        <NavLink
          className={`${style.studOne} block w-8 h-8 bg-contain rounded-full mr-[-8px] bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100`}
          to='https://github.com/AlexGorSer'
        />
        <NavLink
          className={`${style.studTwo} block w-8 h-8 bg-contain rounded-full mr-[-8px] bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100`}
          to='https://github.com/VladTarnovskiy'
        />
        <NavLink
          className={`${style.studThree} block w-8 h-8 bg-contain rounded-full bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100`}
          to='https://github.com/DenisKa13051992'
        />
      </div>
      <div className='account__img text-teal-500 dark:font-semibold dark:text-base_green_light font-thin h-fit  md:hidden'>
        ©2023
      </div>
      <NavLink
        className={`${style.rsLogo} block w-20 h-8 bg-contain bg-no-repeat rs__img hover:cursor-pointer hover:scale-110 hover:transition-all active:scale-100`}
        to='https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md'
      />
    </footer>
  );
};
