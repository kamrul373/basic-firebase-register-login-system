import React from 'react';
import Menu from "../componets/Menu"
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Menu></Menu>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;