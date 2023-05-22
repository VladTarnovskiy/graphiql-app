import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import { Suspense } from 'react';
import Loader from 'src/components/Loader/Loader';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <main className="wrapper pl-[2%] pr-[2%] w-full mb-[13px] dark:bg-base_dark">
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
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
