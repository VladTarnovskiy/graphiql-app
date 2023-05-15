import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import { Suspense } from 'react';
import Loader from 'src/components/Loader/Loader';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <div className="wrapper dark:bg-base_dark pl-[2%] pr-[2%] w-full">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
