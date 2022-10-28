import React, { ReactNode } from 'react';
import LeftSideNav from '../../modules/common/components/LeftSideNav';

type Props = {
    children: ReactNode;
};
const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex w-full">
            <LeftSideNav />
            <div className="dashboard_width">{children}</div>
        </div>
    );
};

export default DashboardLayout;
