import React from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from '../../pages/admin/Dashboard';
import Users from "../../pages/admin/user/Users";
import Industries from "../../pages/admin/industry/Industries";
import Portfolio from "../../pages/admin/portfolio/Portfolio";
import Services from "../../pages/admin/service/Services";
import Technologies from "../../pages/admin/technology/Technologies";
import PortImages from "../../pages/admin/portImage/PortfolioImages";
import Slider from "../../pages/admin/slider/Slider";
import Setting from '../../pages/admin/setting/Setting';

const AdminRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/dashboard">
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="industries" element={<Industries />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="services" element={<Services />} />
                    <Route path="technologies" element={<Technologies />} />
                    <Route path="portimage" element={<PortImages />} />
                    <Route path="slider" element={<Slider />} />
                    <Route path="setting" element={<Setting />} />
                </Route>
            </Routes>
        </>
    )
}

export default AdminRoute
