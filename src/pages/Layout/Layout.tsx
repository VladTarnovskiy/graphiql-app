import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import { Suspense } from 'react';
import Loader from 'src/components/Loader/Loader';
import BurgerMenu from 'src/components/BurgerMenu/BurgerMenu';

function Layout(): JSX.Element {
  return (
    <>
      <div className="burgerMenu hidden sm:block">
        <BurgerMenu />
      </div>
      <Header />
      <main className="wrapper pl-[2%] pr-[2%] w-full pb-[75px] dark:bg-base_dark">
        <Suspense
          fallback={
            <div className="m-auto w-fit mt-[30vh]">
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
