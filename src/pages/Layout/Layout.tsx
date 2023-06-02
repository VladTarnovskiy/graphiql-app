import { Outlet } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { Footer } from 'src/components/Footer/Footer';
import { FC, Suspense } from 'react';
import { Loader } from 'src/components/Loader/Loader';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { BurgerMenu } from 'src/components/BurgerMenu/BurgerMenu';
import { FallBackUIComponent } from 'src/components/ErrorBoundary/FallBackUIComponent/FallBackUIComponent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/utils/firebase';

export const Layout: FC = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <div className='burgerMenu hidden sm:block'>
        <BurgerMenu />
      </div>
      <Header />
      <ErrorBoundary fallBackUIComponent={<FallBackUIComponent />}>
        <main
          className='wrapper mb-[13px] min-h-[79vh] w-full pl-[2%] pr-[2%] dark:bg-base_dark'
          data-testid='main-element'
        >
          {loading && !user ? (
            <div className='m-auto mt-[30vh] w-fit'>
              <Loader />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className='m-auto mt-[30vh] w-fit'>
                  <Loader />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          )}
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
};
