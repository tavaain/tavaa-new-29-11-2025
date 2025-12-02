import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../AllComponents/FN/Footer';
import NaveBar from '../AllComponents/FN/NaveBar';

const MainLayout = () => {

     const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
    return (
        <div>
            <div className="sticky top-0 z-100 -mt-5">
                <NaveBar/>
            </div>
            <div className="min-h-screen my-7">
                <Outlet/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default MainLayout;