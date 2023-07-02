import React from 'react';
import { Outlet } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';

const MainPage = () => {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};

export default MainPage;
