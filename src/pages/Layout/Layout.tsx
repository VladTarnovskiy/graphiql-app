import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import { Suspense } from 'react';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <div className="wrapper pl-[2%] pr-[2%] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
