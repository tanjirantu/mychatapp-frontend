import React, { ReactNode } from 'react';
import LeftSideNav from '../../modules/common/components/LeftSideNav';

type Props = {
    children: ReactNode;
};
const MessageLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex">
            <div className="flex">
                <LeftSideNav />
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default MessageLayout;
