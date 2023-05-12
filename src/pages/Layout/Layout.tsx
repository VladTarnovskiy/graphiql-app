import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import { Suspense } from 'react';
import Loader from 'src/components/Loader/Loader';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="wrapper pl-[2%] pr-[2%] w-full mb-[75px]">
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
